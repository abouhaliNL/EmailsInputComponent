import { IEmailData } from '@/src/Email';
import { SettingsService } from '@/src/Settings';
import { Outcome } from '@/src/Utils/outcome';

export class Email implements IEmailData {
  /**
   * Holds emailaddress as a string literal.
   * @field `email`
   */
  public email: string;
  /**
   * **Creates a new email instance after validation.**
   * @constructor
   * Emailaddress as a string literal.
   * @param email
   */
  private constructor(email: string) {
    this.email = email;
  }
  /**
   * **Creates instance of email if validated, else throws err**
   * @function
   * Emailaddress as a string literal.
   * @param email
   */
  public static createEmail(email: string): Outcome<Email> {
    if (!email) {
      return Outcome.decline<Email>('Email is not present');
    }
    if (
      email.length > SettingsService.config.maxLengthEmail ||
      email.length < SettingsService.config.minLengthEmail
    ) {
      return Outcome.decline<Email>('Length of email is invalid');
    }
    if (!SettingsService.config.emailRegEx.test(email)) {
      return Outcome.decline<Email>('Email failed RegEx-test');
    }
    return Outcome.approved<Email>(new Email(email));
  }
}
