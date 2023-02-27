import { open, opendir, writeFile } from 'node:fs/promises';

class HtmlFileFinder {
  private async read(startDir: string): Promise<string[]> {
    let files: string[] = new Array<string>();
    try {
      const dir = await opendir(startDir);
      for await (const dirent of dir) {
        const path = startDir + '/' + dirent.name;
        // console.log(path);
        if (dirent.name.endsWith('.html')) {
          files.push(path);
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

  async find(): Promise<string[]> {
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
    output.push('  </head>');
    output.push('  <body>');
    output.push('    hello2');
    output.push('  </body>');
    output.push('</html>');

    console.log(output);

    // Write to the index.html file
    //const indexFH = await open('../index.html');
    //await indexFH.writeFile(output.join(''));
    await writeFile('../index.html', output.join('\n'));
  }
}

let writer = new IndexWriter();
writer.write();
