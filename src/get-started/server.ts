import soap from 'soap';

import { service, wsdl } from './service';
import { createServer } from '../http-server';

async function main() {
  const httpServer = await createServer();
  soap.listen(httpServer, '/get-started', service, wsdl);
  return httpServer;
}

export { main as createServer };
