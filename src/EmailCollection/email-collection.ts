import { Email, IEmailData } from '@/src/Email';
import { IEmailCollection } from '@/src/EmailCollection';
import { Outcome } from '@/src/Utils/outcome';

export class EmailCollection implements IEmailCollection {
  /**
   * @field _emailCollection
   * Contains an immutable array of email instances.
   */
  private _emailCollection: ReadonlyArray<Email> = [];

  /**
   * @constructor
   * Possibility to add own list of emails to be added to _emailCollection
   * @param emailCollection
   */
  constructor(emailCollection?: string[]) {
    if (Array.isArray(emailCollection) && emailCollection.length) {
      for (const email of emailCollection) {
        const createEmail = Email.createEmail(email);
        if (createEmail.error) {
          throw createEmail.getValue();
        }
        this._emailCollection = this._emailCollection.concat(createEmail.getValue());
      }
    }
  }

  /**
   * @getter emailCollectionCount
   * Returns the count of current emailcollection.
   */
  get emailCollectionCount(): number {
    return this._emailCollection.length;
  }

  /**
   * @function addEmail
   * Adds an email to the email collection after performing some validation checks.
   * @param email
   */
  addEmail(email: string): void {
    const duplicateEmail = this._emailCollection.find((savedEmails) => {
      return savedEmails.email === email;
    });
    const createEmail = Email.createEmail(email);

    if (duplicateEmail) {
      throw new Error('This email is a duplicate');
    }
    if (createEmail.error) {
      throw createEmail.error;
    }

    this._emailCollection = this._emailCollection.concat(createEmail.getValue());
  }

  /**
   * @function removeEmail
   * Removes an email from the email collection.
   * @param email
   */
  removeEmail(email: string): void {
    if (email) {
      this._emailCollection = this._emailCollection.filter((savedEmails) => {
        return savedEmails.email !== email;
      });
    }
  }
}
