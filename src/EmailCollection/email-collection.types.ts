import { IEmailData } from '@/src/Email';

export interface IEmailCollection {
  addEmail(email: string): void;
  removeEmail(email: string): void;
  emailCollectionCount: number;
}
