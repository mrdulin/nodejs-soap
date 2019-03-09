import soap from 'soap';

import { service, wsdl } from './service';
import { createServer } from '../http-server';

async function main() {
  const httpServer = await createServer();
  const soapServer = soap.listen(httpServer, '/get-started', service, wsdl);

  soapServer.log = function(type, data) {
    console.log('soap server log: ', type, data);
  };
  return httpServer;
}

export { main as createServer };
