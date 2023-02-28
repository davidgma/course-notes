import { open, opendir, writeFile } from 'node:fs/promises';

class LinkNode {
  public name: string;
  public directory: string;
  public level: number;
  public link: string;

  constructor(name: string, link: string, directory: string, level: number) {
    this.name = name;
    this.link = link;
    this.directory = directory;
    this.level = level;
  }
}

class HtmlFileFinder {
  private async read(
    startDir: string,
    dirName: string = '/',
    level: number = 0
  ): Promise<LinkNode[]> {
    let files: LinkNode[] = new Array<LinkNode>();
    try {
      const dir = await opendir(startDir);
      for await (const dirent of dir) {
        const path = startDir + '/' + dirent.name;
        if (dirent.name.endsWith('.html')) {
          files.push(new LinkNode(dirent.name, path, dirName, level));
        }

        if (dirent.isDirectory() && dirent.name != 'node_modules') {
          files.push(new LinkNode('directory', 'none', dirent.name, level));
          const subDir = startDir + '/' + dirent.name;
          //const subDirFiles = await this.read(subDir);
          files = files.concat(await this.read(subDir, dirent.name, level + 1));
        }
      }
    } catch (err) {
      console.error('Error with OpenDir: ' + err);
    }
    return files;
  }

  async find(): Promise<LinkNode[]> {
    return await this.read('..');
  }
}

class IndexWriter {
  private finder = new HtmlFileFinder();

  async write() {
    // Get the .html files
    let nodes = await this.finder.find();

    // Prepare the html
    const output: Array<string> = new Array<string>();
    output.push('<!DOCTYPE html>');
    output.push('<html lang="en">');
    output.push('  <head>');
    output.push('    <meta charset="UTF-8" />');
    output.push('    <meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    output.push(
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    );
    output.push('    <title>Course Notes</title>');
    output.push('<style>');
    output.push('    * {');
    output.push('      box-sizing: border-box;');
    output.push('    }');
    output.push('    .link {');
    output.push('    text-decoration: none;');
    output.push('    }');
    output.push('ul {');
    output.push('list-style-type: none; /* Remove bullets */');
    output.push('}');
    output.push('');
    output.push('</style>');
    output.push('  </head>');
    output.push('  <body>');
    output.push('  <p>');

    for (let line of this.generateList(nodes)) {
      output.push(line);
    }

    output.push('  </p>');
    output.push('');
    output.push('  </body>');
    output.push('</html>');

    //console.log(output);

    // Write to the index.html file
    //const indexFH = await open('../index.html');
    //await indexFH.writeFile(output.join(''));
    await writeFile('../index.html', output.join('\n'));
  }

  private generateList(nodes: LinkNode[]): string[] {
    let result = new Array<string>();
    let currentLevel = 0;
    result.push('<ul>');
    for (const node of nodes) {
      // console.log('name: ' + node.name + ', level: ' + node.level.toString());
      if (
        // node.level == 0 ||
        node.directory == 'css' ||
        node.directory == 'images' ||
        node.directory == 'generate'
      ) {
      } else if (node.name == 'directory') {
        if (node.level > currentLevel) {
          result.push('<li>' + node.directory + '</li>');
        } else if (node.level < currentLevel) {
          result.push('</ul></ul>');
          result.push('<ul>');
          result.push('<li>' + node.directory + '</li>');
        } else {
          result.push('<li>' + node.directory + '</li>');
        }
      } else {
        if (node.level > currentLevel) {
          // console.log('not a directory: ' + JSON.stringify(node));
          result.push('<ul>');
        }
        result.push(
          '<li><a href="' +
            node.link +
            '" class="link">' +
            node.name +
            '</a></li>'
        );
      }
      currentLevel = node.level;
    }
    result.push('</ul>');
    return result;
  }
}

let writer = new IndexWriter();
writer.write();
