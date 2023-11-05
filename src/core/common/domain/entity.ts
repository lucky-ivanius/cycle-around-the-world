import { UniqueId } from './unique-id';

export type Entity<Props> = {
  readonly id: UniqueId;
} & Props;
