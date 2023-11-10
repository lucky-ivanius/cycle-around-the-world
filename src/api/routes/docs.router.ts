import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs/index.json';

const customCssUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

const docsRouter = Router();

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(docs, { customCssUrl }));

export { docsRouter };
