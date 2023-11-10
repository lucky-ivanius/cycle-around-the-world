import bodyParser from 'body-parser';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import { queryParser } from 'express-query-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import { apiConfig } from '../config/api.config';

import { Controller } from '../../infrastructure/http/common/controller';
import { v1Router } from '../routes/api.router';
import { docsRouter } from '../routes/docs.router';

const corsOptions: CorsOptions = {
  origin: apiConfig.origin,
};

const server = express();

server
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(
    queryParser({
      parseNumber: true,
      parseBoolean: true,
      parseNull: true,
      parseUndefined: true,
    })
  )
  .use(cors(corsOptions))
  .use(compression())
  .use(helmet())
  .use(morgan('dev'));

server.get('/', (req, res) => Controller.ok(res, { message: 'Hi 💕' }));

server.use('/api/v1', v1Router);
server.use('/docs/v1', docsRouter);

const port = apiConfig.port;

server.listen(port, () => {
  console.log(`Running on port ${port}! 🚀🚀🚀`);
});

export { server };
