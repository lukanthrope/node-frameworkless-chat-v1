import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import console from './logger.js';

export default (root, port) => {
  http.createServer(async (req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(root, url);
    try {
      const data = await fs.promises.readFile(filePath);
      res.end(data);
    } catch (err) {
      res.statusCode = 404;
      res.end('"File is not found"');
    }
  }).listen(port);

  console.log(`Static on port ${port}`);
};
