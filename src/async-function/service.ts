import faker from 'faker';
import { readWSDL } from '../util';

const service = {
  UserService: {
    ServicePort: {
      getUserById(args: { id: string }, callback: (user: any) => void) {
        const user = { id: args.id, name: faker.name.findName(), email: faker.internet.email() };
        callback(user);
      },

      getUserByEmail(args: { email: string }, callback) {
        const user = { id: faker.random.uuid(), name: faker.name.findName(), email: args.email };
        callback(user);

        // TOOD: promise function not working?
        // return new Promise(resolve => {
        //   setTimeout(() => {
        //     resolve(user);
        //   }, 1000);
        // });
      },
    },
  },
};

const wsdl = readWSDL('get-started.wsdl');

export { service, wsdl };
