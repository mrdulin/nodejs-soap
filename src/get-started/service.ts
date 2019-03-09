import fs from 'fs';
import path from 'path';
import faker from 'faker';

const service = {
  UserService: {
    ServicePort: {
      getUserById(args) {
        const user = { id: args.id, name: faker.name.findName(), email: faker.internet.email() };
        return user;
      }
    }
  }
};

const wsdl = fs.readFileSync(path.resolve(__dirname, './service.wsdl'), 'utf8');

export { service, wsdl };
