import { readdir } from 'node:fs/promises';

async function read(dir: string): Promise<string[]> {
  try {
    const files = await readdir(dir);
    return files;
  } catch (err) {
    console.error(err);
  }
}

async function generate() {
  let files = await read('..');
  for (const file of files) {
    console.log(file);
  }
}

class IndexWriter {
  
}

generate();
