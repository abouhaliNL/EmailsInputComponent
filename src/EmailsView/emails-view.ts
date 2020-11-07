import { SettingsService } from '@/src/Settings';

export class EmailsView {
  /**
   * @field _rootDiv
   * Contains reference element which user passed as Element ID.
   */
  private readonly _rootDiv: HTMLElement;

  /**
   * @field _wrapperDiv
   * Contains reference to the wrapper surrounding the emailblocks and inputfield.
   */
  public _wrapperDiv: HTMLElement;

  /**
   * @field _inputField
   * Contains a reference to
   */
  private readonly _inputField: HTMLInputElement;

  /**
   * @constructor
   * Passes the user entered ID to generate rootDiv.
   * @param emailCollection
   */
  constructor(rootDiv: string) {
    if (!rootDiv) {
      throw new Error('No document ID has been specified to generate view');
    }

    this._rootDiv = document.getElementById(rootDiv) as HTMLElement;
    this._wrapperDiv = document.createElement('div') as HTMLDivElement;
    this._inputField = document.createElement('input');

    this._wrapperDiv.setAttribute('class', SettingsService.config.emailInputFieldCSS);
    this._wrapperDiv.setAttribute('tabindex', '1');
    this._rootDiv.appendChild(this._wrapperDiv);

    this._inputField.placeholder = 'add more people';
    this._inputField.type = 'email';
    this._inputField.className = SettingsService.config.emailInputElementCSS;
    this._wrapperDiv.appendChild(this._inputField);
  }
  /**
   * @function renderEmailblock
   * Renders the email block which contains validated emails.
   * @param email
   */
  public renderEmailBlock(email: string, valid: boolean): void {
    const emailBlock: HTMLSpanElement = document.createElement('span');
    const deleteEmailIcon: HTMLSpanElement = document.createElement('span');

    deleteEmailIcon.dataset.function = 'deleteEmail';
    deleteEmailIcon.classList.add(SettingsService.config.emailDeleteIconCSS);

    emailBlock.innerText = email;
    emailBlock.insertAdjacentElement('beforeend', deleteEmailIcon);

    if (valid) {
      emailBlock.classList.add(SettingsService.config.emailValidBlockCSS);
    } else {
      emailBlock.classList.add(SettingsService.config.emailInvalidBlockCSS);
      emailBlock.dataset.validity = 'false';
    }

    this._wrapperDiv.insertBefore(emailBlock, this._inputField);
    this._inputField.value = '';
  }
}
