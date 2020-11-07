import '../public/styles/main.scss';
import '../public/styles/normalize.scss';

import { EmailCollection } from './EmailCollection';
import { EmailsView } from '@/src/EmailsView';
import { Settings, SettingsService } from '@/src/Settings';

export default class EmailInputComponent {
  /**
   * @field _emailsView
   * This field contains an instance EmailsView class, which renders all DOM elements.
   */
  private readonly _emailsView: EmailsView;
  /**
   * @field _emailCollection
   * This field contains the emailcollection service.
   */
  private readonly _emailCollection: EmailCollection;
  /**
   * @field _settingsService - This field contains an instance of the settings which have been used to initialize
   * the emailinput component.
   */
  readonly _settingsService: SettingsService;
  /**
   * @field _rootContainer - This field contains a reference to the root container to which this library
   * has been appended.
   */
  constructor(elementID: string, settings?: Settings, emails?: string[]) {
    this._settingsService = new SettingsService(settings);
    this._emailsView = new EmailsView(elementID);
    this.addAllEventListeners(this._emailsView._wrapperDiv);
    try {
      this._emailCollection = new EmailCollection(emails);
      if (emails) {
        for (const email of emails) {
          this._emailsView.renderEmailBlock(email, true);
        }
      }
    } catch (e) {
      throw new Error('The list of emails you tried to instantiate contains invalid emails');
    }
  }

  /**
   * @function addEmail
   * Adds a valid email to the collection and renders appropriate blocks.
   * @param email
   */
  addEmail(email: string): void {
    if (!email) {
      throw new Error('Not possible to add new email, because the email is not present');
    }
    try {
      this._emailCollection.addEmail(email);
      this._emailsView.renderEmailBlock(email, true);
    } catch {
      this._emailsView.renderEmailBlock(email, false);
    }
  }

  /**
   * @function getValidEmailsCount
   * This function returns a count of all the valid emails.
   */
  public getValidEmailsCount(): void {
    alert(this._emailCollection.emailCollectionCount);
  }

  /**
   * @function deleteEmail
   * This function deletes an email from the collection after
   * getting the call through an click event on the valid / invalid email DOM element.
   */
  deleteEmail(email: string): void {
    if (!email) {
      throw new Error('Not possible to remove the email, email is passed incorrectly');
    }
    this._emailCollection.removeEmail(email);
  }

  /**
   * @function addEventListersInputHolder
   * This function adds all the needed eventlisteners to the divwrapper and utilizez
   * event delegation to handle all the events.
   * @param wrapperDiv
   */
  addAllEventListeners(wrapperDiv: HTMLElement) {
    [
      [
        'paste',
        (event: ClipboardEvent) => {
          if (event.currentTarget === wrapperDiv) {
            const pasteVal = event.clipboardData?.getData('text/plain') as string;
            pasteVal.split(SettingsService.config.copyPasteSeparator).forEach((email: string) => {
              this.addEmail(email);
            });
          }
          event.preventDefault();
        },
        false,
      ],
      [
        'focus',
        (event: Event) => {
          wrapperDiv.classList.add(SettingsService.config.emailHolderFocusCSS);
        },
        true,
      ],
      [
        'blur',
        (event: Event) => {
          if ((event.target as HTMLInputElement).tagName === 'INPUT') {
            const emailVal = (event.target as HTMLInputElement).value;
            if (emailVal) {
              this.addEmail(emailVal);
            }
          }
          wrapperDiv.classList.remove(SettingsService.config.emailHolderFocusCSS);
        },
        true,
      ],
      [
        'click',
        (event: Event) => {
          if ((event.target as HTMLSpanElement).dataset.function === 'deleteEmail') {
            const emailBlock = (event.target as HTMLSpanElement).parentElement as HTMLSpanElement;
            const mailVal = emailBlock.innerText;
            if (emailBlock.dataset.validity !== 'false') {
              this.deleteEmail(mailVal);
            }
            emailBlock.remove();
          }
        },
        false,
      ],
      [
        'keydown',
        (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            const emailVal = (event.target as HTMLInputElement).value;
            this.addEmail(emailVal);
          }
          if (event.key === ',') {
            event.preventDefault();
            const emailVal = (event.target as HTMLInputElement).value;
            this.addEmail(emailVal);
          }
        },
        false,
      ],
    ].forEach((val) => {
      const [eventType, eventHandler, useCapture] = val;
      wrapperDiv.addEventListener(
        eventType as string,
        eventHandler as EventListener,
        useCapture as boolean
      );
    });
  }
}
