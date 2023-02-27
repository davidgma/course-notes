import { readdir } from 'node:fs/promises';

class HtmlFileFinder {
  async read(dir: string): Promise<string[]> {
    try {
      const files = await readdir(dir);
      return files;
    } catch (err) {
      console.error(err);
    }
  }

  async find() {
    let files = await this.read('..');
    for (const file of files) {
      console.log(file);
    }
  }
}

class IndexWriter {}

let finder = new HtmlFileFinder();
finder.find();
