import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';

export type GetSpotDetailError = NotFoundError | UnexpectedError;
