import soap from 'soap';
import faker from 'faker';

import { config } from '../config';

const url = `http://${config.HOST}:${config.PORT}/get-started?wsdl`;

soap.createClient(url, (createClientError, client: soap.Client) => {
  if (createClientError) {
    console.error(createClientError);
    return;
  }

  // client.on('request', (xml, eid) => {
  //   console.log('request xml: ', xml);
  //   console.log('request eid: ', eid);
  // });

  // client.on('message', (message, eid) => {
  //   console.log('message message: ', message);
  //   console.log('message eid: ', eid);
  // });

  // console.log('client.getBodyAttributes: ', client.getBodyAttributes());
  // console.log('client.describe: ', client.describe());
  // console.log('client.wsdl: ', client.wsdl);

  if (typeof client.getUserById === 'function') {
    const args = { id: faker.random.uuid() };
    client.getUserById(args, (getUserByIdError, result) => {
      if (getUserByIdError) {
        console.error(getUserByIdError);
        return;
      }
      console.log('getUserById: ', result);
    });
  } else {
    console.error('client.getUserById is not a function');
  }

  // or
  if (typeof client.getUserByIdAsync === 'function') {
    const args = { id: faker.random.uuid() };
    (client as any)
      .getUserByIdAsync(args)
      .then((result) => {
        console.log('getUserByIdAsync: ', result);
      })
      .catch(console.error);
  }
});
