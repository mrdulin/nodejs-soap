import faker from 'faker';
import { readWSDL } from '../util';

const service = {
  UserService: {
    ServicePort: {
      getUserById(args) {
        const user = { id: args.id, name: faker.name.findName(), email: faker.internet.email() };
        return user;
      },
    },
  },
};

const wsdl = readWSDL('get-started.wsdl');

export { service, wsdl };
