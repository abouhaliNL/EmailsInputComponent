import { Settings } from './settings.types';

export const SETTINGS_DEFAULT: Settings = Object.freeze({
  emailInputFieldCSS: 'emails-input-field',
  emailInputElementCSS: '__inputElement',
  emailValidBlockCSS: '__validEmail',
  emailInvalidBlockCSS: '__invalidEmail',
  emailDeleteIconCSS: '__deleteEmailIcon',
  emailHolderFocusCSS: '__emailHolderFocus',
  maxLengthEmail: 30,
  minLengthEmail: 6,
  emailRegEx: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  copyPasteSeparator: ',',
});

/**
 * @class SettingsService - This class creates and injects either default settings
 * or settings as provided by the user of this library.
 */
export class SettingsService {
  /**
   * @field config
   * This static field contains all the settings which,
   * can be consumed by other services / instances.
   */
  public static config: Settings = SETTINGS_DEFAULT;
  /**
   * @constructor
   * The constructor can take a settings object to (partially) overwrite the default settings.
   */
  constructor(customConfig?: Partial<Settings>) {
    SettingsService.config = customConfig
      ? Object.freeze({ ...SETTINGS_DEFAULT, ...customConfig })
      : SETTINGS_DEFAULT;
  }
}
