import { Email } from './email';
import { Outcome } from '@/src/Utils/outcome';

describe('>>> Email', () => {
  let emailCreation: Outcome<Email>;

  describe('>> Instantion & Adding Email Works', () => {
    beforeEach(() => {
      emailCreation = Email.createEmail('example@mail.com');
    });
    it('Should add an email ', () => {
      const { email } = emailCreation.getValue();
      expect(email).toEqual('example@mail.com');
    });
    it('Should instantiate email class and return instance when valid email is added', () => {
      const emailInstance = emailCreation.getValue();
      expect(emailInstance).toBeInstanceOf(Email);
    });
  });

  describe('>> Validation rules', () => {
    //Passed in default values can be found in src/settings
    it('Should throw when empty string is passed', () => {
      emailCreation = Email.createEmail('');
      expect(() => emailCreation.getValue()).toThrow();
    });

    it('Should throw and create error when passed email is too long', () => {
      emailCreation = Email.createEmail('waytolongofanemailreaching30plus@mail.com');
      expect(emailCreation.error).toEqual('Length of email is invalid');
      expect(() => emailCreation.getValue()).toThrow();
    });

    it('Should throw and create error when passed email is too short', () => {
      emailCreation = Email.createEmail('a@b.c');
      expect(emailCreation.error).toEqual('Length of email is invalid');
      expect(() => emailCreation.getValue()).toThrow();
    });
    
    test.each([
      ['example', 'Email failed RegEx-test'],
      ['tricky@example', 'Email failed RegEx-test'],
      ['tricky@.com', 'Email failed RegEx-test'],
      ['TriCky.@com', 'Email failed RegEx-test'],
    ])('Should throw and create error when fail email regex', (a, expected) => {
      emailCreation = Email.createEmail(a);
      expect(emailCreation.error).toEqual(expected);
      expect(() => emailCreation.getValue()).toThrow();
    });
  });
});
