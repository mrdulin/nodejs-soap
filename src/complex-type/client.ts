import soap from 'soap';
import faker from 'faker';

import { config } from '../config';

const url = `http://${config.HOST}:${config.PORT}/complex-type?wsdl`;

soap
  .createClientAsync(url)
  .then((client: any) => {
    const args = { id: faker.random.uuid() };
    return client.getUserByIdAsync(args);
  })
  .then((getUserByIdAsyncResult) => {
    console.log('getUserByIdAsyncResult: ', getUserByIdAsyncResult);
  })
  .catch((error) => console.error(error.message));
