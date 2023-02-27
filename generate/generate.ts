import { open, opendir, writeFile } from 'node:fs/promises';

class LinkNode {
  public name: string;
  public parent: LinkNode;
  public children: Array<LinkNode>;
  public link: string;

  constructor(name: string) {
    this.name = name;
  }
}

class HtmlFileFinder {
  private async read(startDir: string): Promise<LinkNode[]> {
    let files: LinkNode[] = new Array<LinkNode>();
    try {
      const dir = await opendir(startDir);
      for await (const dirent of dir) {
        const path = startDir + '/' + dirent.name;
        if (dirent.name.endsWith('.html')) {
          files.push(new LinkNode(path));
        }

        if (dirent.isDirectory() && dirent.name != 'node_modules') {
          const subDir = startDir + '/' + dirent.name;
          //const subDirFiles = await this.read(subDir);
          files = files.concat(await this.read(subDir));
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
    let files = await this.finder.find();
    for (const file of files) {
      console.log(file);
    }

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
    output.push('');
    output.push('</style>');
    output.push('  </head>');
    output.push('  <body>');

    for (let line of this.generateList(files)) {
      output.push(line);
    }

    output.push('    hello2');
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
    for (const node of nodes) {
      result.push(
        '<p><a href="' + node.name + '" class="link">' + node.name + '</a><p>'
      );
    }
    return result;
  }
}

let writer = new IndexWriter();
writer.write();
