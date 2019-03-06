import http from 'http';
import fs from 'fs';
import path from 'path';
import request from 'request-promise';
import xml2js from 'xml2js';

import { createServer } from '../../get-started/server';
import { config } from '../../config';

let server: http.Server;
beforeAll(async () => {
  server = await createServer();
});

afterAll((done: jest.DoneCallback) => {
  server.close(done);
});

function tagNameProcessor(name) {
  console.log('tagNameProcessors: ', name);
  return name;
}

function attrNameProcessor(name) {
  console.log('attrNameProcessors: ', name);
  return name;
}

function valueProcessor(name) {
  console.log('valueProcessors: ', name);
  return name;
}

function attrValueProcessor(value, name) {
  console.log('attrValueProcessors: ', value, name);
  return value;
}

describe('get-started', () => {
  const url = `http://localhost:${config.PORT}/get-started?wsdl`;
  const xml = fs.readFileSync(path.resolve(__dirname, './request.xml'), 'utf8');
  it('should get correct result using http request', async () => {
    const options = {
      url,
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length': xml.length
      }
    };

    const rawXml = await request(options);
    const parser = new xml2js.Parser({
      explicitArray: false,
      trim: true
      // tagNameProcessors: [tagNameProcessor],
      // attrNameProcessors: [attrNameProcessor],
      // valueProcessors: [valueProcessor],
      // attrValueProcessors: [attrValueProcessor]
    });

    parser.parseString(rawXml, (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log('actualValue: ', JSON.stringify(result));
    });
  });
});
