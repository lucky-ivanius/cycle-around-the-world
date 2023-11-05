import { v4 as uuid } from 'uuid';

export class UniqueId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? uuid();
  }

  public toString(): string {
    return this.value;
  }
}
