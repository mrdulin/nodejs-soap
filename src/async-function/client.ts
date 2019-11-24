import soap from 'soap';
import faker from 'faker';

import { config } from '../config';

const url = `http://${config.HOST}:${config.PORT}/get-started?wsdl`;

soap
  .createClientAsync(url)
  .then((client: any) => {
    const args = { id: faker.random.uuid() };
    return client.getUserByIdAsync(args).then((getUserByIdAsyncResult) => [client, getUserByIdAsyncResult]);
  })

  .then(([client, getUserByIdAsyncResult]) => {
    console.log('getUserByIdAsync: ', getUserByIdAsyncResult);
    const args = { email: faker.internet.email() };
    return client.getUserByEmailAsync(args).then((getUserByEmailAsyncResult) => [client, getUserByEmailAsyncResult]);
  })
  .then(([client, getUserByEmailAsyncResult]) => {
    console.log('getUserByEmailAsyncResult: ', getUserByEmailAsyncResult);
  })
  .catch((error) => console.error(error.message));
