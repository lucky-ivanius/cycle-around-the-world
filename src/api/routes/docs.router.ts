import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs/index.json';

const docsRouter = Router();

docsRouter.use('/', swaggerUi.serve);
docsRouter.use('/', swaggerUi.setup(docs));

export { docsRouter };
