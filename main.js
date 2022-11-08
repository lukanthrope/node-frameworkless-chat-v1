import fsp from 'node:fs/promises';
import path from 'node:path';

import { Container } from './lib/di.js';
import config from './config.js';
import http from './http.js';
import staticServer from './static.js';
import ws from './ws.js';
import db from './db.js';
import hash from './hash.js';
import logger from './logger.js';

const injectable = {
  logger: Object.freeze(logger),
  db: db,
  common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

const container = new Container(injectable);

(async () => {
  const files = await fsp.readdir(apiPath);
  const { transport, staticServerPort } = config;
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const { default: Module } = await import(filePath);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = container.add(serviceName, Module);

    console.log({ ...routing[serviceName] });
  }

  staticServer('./static', staticServerPort);

  const availableServers = { http, ws };
  for (const protocol in transport) {
    availableServers[protocol](routing, transport[protocol]);
  }
})();
