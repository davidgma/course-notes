import { opendir } from 'node:fs/promises';

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

  async find() {
    let files = await this.read('..');
    for (const file of files) {
      console.log(file);
    }
  }
}

class IndexWriter {
  private finder = new HtmlFileFinder();

  async write() {
    this.finder.find();
  }
}

let writer = new IndexWriter();
writer.write();
