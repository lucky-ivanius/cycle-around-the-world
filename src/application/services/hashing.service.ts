export interface HashingService {
  hash(value: string): Promise<string>;
  compare(value: string, hashValue: string): Promise<boolean>;
}
