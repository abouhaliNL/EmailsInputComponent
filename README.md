# Email Input Component

An easy email reusable input component to input emails within your application!

![preview](http://i.imgur.com/IKxPiAn.png "Preview")

## 🚀 How to use in your project?

Add the library to your project like this:

```html
<script src="<PATH_TO_LIB>/emails-input.js"></script>
```

Don't forget your CSS:

```html
<link rel="stylesheet" src="<PATH_TO_LIB>/emails-input.css" />
```

You need to instantiate the div with the selector ID of the element you want
the component appended to.

```html
<div id="app"></div>
<script>
  const emailsInput = new EmailsInput('app');
</script>
```

### NPM scripts

- `npm test`: Run test suite
- `npm build`: Build dist
- `npm serve`: Start dev server

### 📦 Features

- `Enter`, a comma `,` , or losing focus on the input field generates a new email block.
- Pasted emails are entered immediately.
- Automatic validation whereby for example duplicate emails don't get accepted.
- High customization options.

### 🔧 Customization

```html
<div id="app"></div>
<script>
  const emailsInput = new EmailsInput('app', { minLengthEmail: 4, copyPasteSeparator: ';' }, [
    'example1@gmail.com',
    'example2@gmail.com',
  ]);
</script>
```

- Also possible to add an initial list of valid emails in the third parameter of the constructor!

## 📋 Props

| Property             |  Type  |                  Default                   | Description                                               |
| -------------------- | :----: | :----------------------------------------: | --------------------------------------------------------- |
| emailInputFieldCSS   | string |             emails-input-field             | CSS Class of the Root HTML Element of the Input Component |
| emailInputElementCSS | string |              \_\_inputElement              | CSS Class of the Input Element within the Input Component |
| emailValidBlockCSS   | string |               \_\_validEmail               | CSS Class of the valid email block element                |
| emailInvalidBlockCSS | string |              \_\_invalidEmail              | CSS Class of the invalid email block element              |
| emailDeleteIconCSS   | string |            \_\_deleteEmailIcon             | CSS Class of the delete email icon.                       |
| emailHolderFocusCSS  | string |            \_\_emailHolderFocus            | CSS Class of the focus state of the email blocks wrapper  |
| maxLengthEmail       | number |                     30                     | Max length an email is allowed to be                      |
| minLengthEmail       | number |                     6                      | Min length an email is allowed to be                      |
| emailRegEx           | RegExp | new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+\$/), | The regex each email is tested against                    |
| copyPasteSeparator   | string |                     ,                      | The separator for lists to copy paste.                    |
