import xml2js from 'xml2js';

import { config } from '../../config';

const builder = new xml2js.Builder();

const xml = {
  getUserByIdRequest(id: string): string {
    const args = {
      'soap:Envelope': {
        $: {
          'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:tns': `http://${config.HOST}:${config.PORT}/get-started/service.wsdl`
        },
        'soap:Body': {
          'tns:getUserById': { id }
        }
      }
    };
    return builder.buildObject(args);
  }
};

export { xml as dynamicXML };
