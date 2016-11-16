import fs from 'fs';
import path from 'path';

function readWSDL(filename: string) {
  return fs.readFileSync(path.resolve(__dirname, `./wsdl/${filename}`), 'utf8');
}

export { readWSDL };
