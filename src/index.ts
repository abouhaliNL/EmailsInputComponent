/**ENTRY FILE FOR WEBPACK DEV SERVER*/

import '@/public/styles/main.scss';
import '@/public/styles/normalize.scss';
import EmailInputComponent from './emails-input';

const emailsInput = new EmailInputComponent('app');

interface CustomWindow extends Window {
  emailsInput?: EmailInputComponent;
}

const customWindow: CustomWindow = window;
customWindow.emailsInput = emailsInput;
