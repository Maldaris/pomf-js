import fs from 'fs';
import path from 'path';

import moment from 'moment';
import shortid from 'shortid';

import { insertFile, existingFile } from '../queries';

const generateName = file => `${shortid()}-${file.name}`;

const handler = (config, db) => (files, apiKey) => {
  return files.map(async file => {
    if (config.whitelist && config.whitelist.indexOf(file.mimeType) === -1) {
      return null;
    } else if (config.blacklist && config.blacklist.indexOf(file.mime) !== -1) {
      return null;
    }

    const exists = await db.get(existingFile, file.md5, file.size);

    if (exists.count !== 0) {
      return { url: path.join(config.baseUrl, exists.filename) }
    } else {
      const newName = generateName(file.name);

      const writeStream = fs.createWriteStream(path.join(config.fileRoot, newName), { encoding: 'utf8' });
      /*
        dirty hack
        https: //stackoverflow.com/questions/33599688/how-to-use-es8-async-await-with-streams
      */
      const end = new Promise((resolve, reject) => {
        writeStream.pipe(fs.createWriteStream(path.join(file.tempFilePath)));
        writeStream.on('end', resolve);
        writeStream.on('error', reject);
      });

      await end;

      return { url: path.join(config.baseUrl, newName )};
    }
   });
};

export default handler;