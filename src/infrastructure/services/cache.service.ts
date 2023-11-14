export interface CacheService {
  create(key: string, value: string, expiryHours?: number): Promise<void>;
  get(key: string): Promise<string | null>;
  exists(keys: string[]): Promise<boolean>;
  parseFromObjectValue<T extends object>(value: T): Promise<string>;
  parseToObjectValue<T extends object>(value: string): Promise<T>;
  delete(keys: string[]): Promise<void>;
  clear(): Promise<void>;
}
