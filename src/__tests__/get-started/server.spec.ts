import http from 'http';
import fs from 'fs';
import path from 'path';
import request from 'request-promise';
import xml2js from 'xml2js';
import faker from 'faker';

import { createServer } from '../../get-started/server';
import { config } from '../../config';
import { dynamicXML } from './dynamic-xml';

const parser = new xml2js.Parser({ explicitArray: false, trim: true });
let server: http.Server;
beforeAll(async () => {
  server = await createServer();
});

afterAll((done: jest.DoneCallback) => {
  server.close(done);
});

describe('get-started', () => {
  const url = `http://${config.HOST}:${config.PORT}/get-started?wsdl`;

  it('should get correct result using http request and static xml', async (done: jest.DoneCallback) => {
    const xml = fs.readFileSync(path.resolve(__dirname, './static-xml.xml'), 'utf8');
    const uuid = '8104d3c3-de13-432f-b4a0-a62f84f6206a';
    const options = {
      url,
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length': xml.length,
      },
    };

    const rawXml = await request(options);
    parser.parseString(rawXml, (err, actualValue) => {
      if (err) {
        done(err);
      }
      console.log('actualValue: ', JSON.stringify(actualValue));
      expect(actualValue['soap:Envelope']['soap:Body']['tns:getUserByIdResponse']['tns:id']).toBe(uuid);
      done();
    });
  });

  it('should get correct result using http request and dynamic xml', async (done: jest.DoneCallback) => {
    const uuid = faker.random.uuid();
    const xml = dynamicXML.getUserByIdRequest(uuid);
    const options = {
      url,
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length': xml.length,
      },
    };

    const rawXml = await request(options);
    parser.parseString(rawXml, (err, actualValue) => {
      if (err) {
        done(err);
      }
      console.log('actualValue: ', JSON.stringify(actualValue));
      expect(actualValue['soap:Envelope']['soap:Body']['tns:getUserByIdResponse']['tns:id']).toBe(uuid);
      done();
    });
  });
});
