import express from 'express';
import bodyParser from 'body-parser';
import soap from 'soap';
import http from 'http';
import { AddressInfo } from 'net';

import { config } from '../config';
import { service, wsdl } from './service';

async function createServer(): Promise<http.Server> {
  const app = express();
  const server = http.createServer(app);

  app.use(
    bodyParser.raw({
      type: () => true,
      limit: '5mb'
    })
  );

  server.on('close', () => {
    console.log(`Http server is closed.`);
  });
  server.on('error', error => {
    console.log(`Http server start failed.`);
  });

  return new Promise((resolve, reject) => {
    server.listen(config.PORT, config.HOST, () => {
      const addressInfo: AddressInfo | string | null = server.address();
      let address: string;
      if (addressInfo) {
        address = typeof addressInfo === 'string' ? addressInfo : `${addressInfo.address}:${addressInfo.port}`;
      } else {
        address = `http://${config.HOST}:${config.PORT}`;
      }
      console.log(`Http server is listening on ${address}`);
      const soapServer = soap.listen(app, '/get-started', service, wsdl);
      soapServer.log = function(type, data) {
        console.log('soap server log');
        console.log('type: ', type);
        console.log('data: ', data);
      };
      resolve(server);
    });
  });
}

export { createServer };
