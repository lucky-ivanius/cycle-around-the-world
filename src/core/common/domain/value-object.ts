export type ValueObject<TProps> = {
  [K in keyof TProps]: TProps[K];
};
