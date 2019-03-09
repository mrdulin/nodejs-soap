import express from 'express';
import bodyParser from 'body-parser';
import soap from 'soap';

import { config } from '../config';
import { service, wsdl } from './service';

function createServer() {
  const app = express();

  app.use(
    bodyParser.raw({
      type: () => true,
      limit: '5mb'
    })
  );

  return app.listen(config.PORT, () => {
    console.log(`Http server is listening on http://localhost:${config.PORT}`);
    soap.listen(app, '/get-started', service, wsdl);
  });
}

export { createServer };
