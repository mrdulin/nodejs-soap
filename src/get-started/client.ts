import soap from 'soap';
import faker from 'faker';

import { config } from '../config';

const url = `http://localhost:${config.PORT}/get-started?wsdl`;

soap.createClient(url, (createClientError, client: any) => {
  if (createClientError) {
    console.error(createClientError);
    return;
  }
  const args = { id: faker.random.uuid() };
  client.getUserById(args, (getUserByIdError, result) => {
    if (getUserByIdError) {
      console.error(getUserByIdError);
      return;
    }
    console.log('getUserById result: ', result);
  });
});
