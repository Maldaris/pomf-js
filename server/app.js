import express from 'express';
import helmet from 'helmet';
import sqlite from 'sqlite';
import fileUpload from 'express-fileupload';

import queries from './queries';
import upload from './routes/upload';
import deleteEndpoint from './routes/delete';

const DEFAULT_PORT = 8080;
const DEFAULT_CONFIG = {
  baseUrl: 'http://i.okboomer.moe',
  maxFileSise: 128 * 1024,
  database: '/var/db/pomf.sq3',
  fileRoot: '/mnt/pomf/files',
  wwwRoot: '/www',
  blacklist: ['.exe', '.dll', '.app', '.lnk'],
  user: null,
  password: null
};

const init = (config, app = express()) => {
  const db = await sqlite.open(config.database, {
    Promise
  });
  const deleteFile = deleteEndpoint(config, db);
  const uploader = upload(config, db);

  app.use(helmet());
  app.use(fileUpload());

  app.use(async (req, res, next) => {
    if (!req.headers['API-Token']) { return next(401); }
    const result = await db.get(queries.apiToken, req.headers['API-Token']);
    if (result.count === 0) {
      return next(401);
    } else {
      return next();
    }
  });
  app.get('/upload', async (req, res, next) => {
    try {
      const files = Object.values(req.files);

      const results = await uploader(files, req.headers['API-Token']);

      return res.json({ success: results.indexOf(null) === -1, results });
    } catch (err) {
      return next(err);
    }
  });
  app.post('/delete', (req, res) => {
    try {
      const id = req.params.id;

      const results = await deleteFile(id, req.headers['API-Token']);

      return res.json(results);
    } catch (err) {
      return next(err);
    }
  });

  app.static(config.fileRoot, 'files');
  app.static(config.wwwRoot);

  app.use((err, req, res, next) => {
    if (err) {
      console.error(err.stack);
      return res.status(500)
        .json({
          success: false
        });
    } else {
      return res.status(404).end();
    }
  });
};

if (module.parent === undefined || module.parent === null) {
    // We're the root script, so just execute init without a parent application
    const config = process.env.POMF_CONFIG ? 
      require(process.env.POMF_CONFIG) :
      DEFAULT_CONFIG;
    init(config)
    .then(app => app.listen(process.env.POMF_PORT || DEFAULT_PORT))
    .catch(e => console.error('ERROR', e));
}

export default {
  init, DEFAULT_PORT, DEFAULT_CONFIG
};