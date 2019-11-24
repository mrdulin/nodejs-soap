import express from 'express';
import bodyParser from 'body-parser';
import soap from 'soap';
import http from 'http';
import { AddressInfo } from 'net';
import { config } from './config';

interface IHttpServerOptions {
  PORT?: number;
  HOST?: string;
}

async function createServer(opts?: IHttpServerOptions): Promise<http.Server> {
  const app = express();
  const server = http.createServer(app);
  const defaultOptions = {
    PORT: config.PORT,
    HOST: config.HOST,
  };
  const finalOptions = Object.assign({}, defaultOptions, opts);

  app.use(
    bodyParser.raw({
      type: () => true,
      limit: '5mb',
    }),
  );

  server.on('close', () => {
    console.log(`Http server is closed.`);
  });
  server.on('error', (error) => {
    console.log(`Http server start failed.`);
  });

  return new Promise((resolve) => {
    server.listen(finalOptions.PORT, finalOptions.HOST, () => {
      const addressInfo: AddressInfo | string | null = server.address();
      let address: string;
      if (addressInfo) {
        address = typeof addressInfo === 'string' ? addressInfo : `${addressInfo.address}:${addressInfo.port}`;
      } else {
        address = `http://${finalOptions.HOST}:${finalOptions.PORT}`;
      }
      console.log(`Http server is listening on ${address}`);
      resolve(server);
    });
  });
}

export { createServer };
