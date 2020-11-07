import { Email } from '@/src/Email';
import { EmailCollection } from '@/src/EmailCollection';

describe('>>> EmailCollection', () => {
  let emailCollection: EmailCollection;
  beforeEach(() => (emailCollection = new EmailCollection()));
  describe('>> Initialization', () => {
    it('When provided with a list of valid emails, they should be added to the emailcollection', () => {
      const validMailsList = ['example1@gmail.com', 'example2@gmail.com', 'example3@gmail.com'];
      emailCollection = new EmailCollection(validMailsList);
      expect(emailCollection['_emailCollection']).toHaveLength(validMailsList.length);
      for (let i = 0; i < emailCollection['_emailCollection'].length; i++) {
        expect(emailCollection['_emailCollection'][i]).toEqual(
          Email.createEmail(validMailsList[i]).getValue()
        );
        expect(emailCollection['_emailCollection'][i]).toBeInstanceOf(Email);
      }
    });

    it('Should throw when provided with a list where => 1 email is invalid', () => {
      const invalidMailsList = ['example@.faulty', 'example2@gmail.com', 'example3@gmail.com'];
      expect(() => new EmailCollection(invalidMailsList)).toThrow();
    });
  });

  describe('>> Adding a new email to the emailcollection', () => {
    emailCollection = new EmailCollection();
    test.each([
      ['example', 'Email failed RegEx-test'],
      ['a@b.c', 'Length of email is invalid'],
      ['waytolongofanemailreaching30plus', 'Length of email is invalid'],
      ['', 'Email is not present'],
    ])('Should throw with correct error when trying to add invalid email', (a, expected) => {
      expect(() => emailCollection.addEmail(a)).toThrowError(expected);
    });

    it('Should be able to add a valid email to the emailcollection', () => {
      const spyAddMail = jest.spyOn(emailCollection, 'addEmail');
      emailCollection.addEmail('example@gmail.com');
      expect(spyAddMail).toHaveBeenCalledTimes(1);
      expect(emailCollection['_emailCollection'].length).toBe(1);
      expect(emailCollection['_emailCollection'][0].email).toEqual('example@gmail.com');
    });

    it('Should throw when adding a duplicate mail to the emailcollection', () => {
      emailCollection.addEmail('example@gmail.com');
      expect(() => emailCollection.addEmail('example@gmail.com')).toThrowError(
        'This email is a duplicate'
      );
    });
  });

  describe('>> Remove Email', () => {
    it('Should filter out the correct email out of the emailcollection', () => {
      emailCollection = new EmailCollection([
        'example1@gmail.com',
        'example2@gmail.com',
        'example3@gmail.com',
      ]);
      const spyRemoveEmail = jest.spyOn(emailCollection, 'removeEmail');
      expect(emailCollection.emailCollectionCount).toEqual(3);
      emailCollection.removeEmail('example2@gmail.com');
      expect(spyRemoveEmail).toHaveBeenCalledTimes(1);
      expect(emailCollection.emailCollectionCount).toEqual(2);
      expect(emailCollection['_emailCollection']).not.toContain(
        Email.createEmail('example2@gmail.com').getValue()
      );
    });
  });
});
