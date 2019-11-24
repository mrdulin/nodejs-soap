import faker from 'faker';
import { readWSDL } from '../util';

const service = {
  UserService: {
    ServicePort: {
      getUserById(args: { id: string }, callback: (user: any) => void) {
        const user = { id: args.id, name: faker.name.findName(), email: faker.internet.email() };
        callback(user);
      },
    },
  },
};

const wsdl = readWSDL('complex-type.wsdl');

export { service, wsdl };
