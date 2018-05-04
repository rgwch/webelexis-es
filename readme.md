# Webelexis for Elexis-Server 

### Quick start

### Prerequisites

* Git
* Docker
* NodeJS

### Installation:

```
git clone htts://github.com/rgwch/webelexis-es
cd webelexis-es
npm install
```

### Preparation

* Open a terminal and launch the elexis server:

```
./rundocker.sh
```

* Grab your mobile phone and get 'Google Authenticator' from the App Store/Play Store.

* Launch your favourite browser and navigate to the [Elexis-Server-Wiki](https://github.com/elexis/elexis-server/wiki/SMART-on-FHIR). Scroll down to the Admin-QR-Code for the demo database and youse this as a seed for the Google Authenticator App.


* Navigate to <http://localhost:8380/openid> and log in as **Administrator** with the Password **Admin** and a 2FA-token generated from your mobile app.

* Go to **manage clients** and add a **new client**. 

### Launch and use

```
au run --watch
``` 

navigate to <http://localhost:9000>

click "login" and enter credentials.

## Quick guide through the code:

### Life cycle

The life cycle starts with the client's call to index.html which loads the (one and only) html page of the App. The script at the bottom of the file loads the JavaScript Code and launches src/main.ts/configure(), which, in turn, fetches src/app.html and replaces the "body"-element of index.html dynamically with its content. then it loads app.ts, binds it to the elements in app.html and runs configureRouter(). The default route is ["","login"] which references src/routes/init/login. After successful authenticate, the route src/routes/init/ready is called from openId. After that, the menu bar is displayed and routes are available according to the roles of the logged-in user. Each route is an Aurelia component consisting of a *.ts file and a *.html file.

### Bundling

When bundling (`au build` or `au run`) , all *.ts files are compiled to javascript (using the settings in *tsconfig.json*) and merged together with *.html and *.css files into *scripts/app-bundle.js*. The framework and library files are bundled similarly into *scripts/vendor-bundle.js*.

### Internationalization

All language files are collected in *locales*. To load a localized string in a *.ts file, the following steps are required:

* Import {I18N} from 'aurelia-i18n'

* Inject the I18N singleton

* call the tr - method of that singleton with the key of the desired string to get a localozed version of that string.

```javascript
import {I18N} from 'aurelia-i18n'
import {autoinject} from 'aurelia-framework'

@autoinject
export class Test{
  constructor(private t:I18N){}

  attached(){
    alert(this.t.tr("patients.firstname"))
  }
}
```
This snippet will output "Vorname" in a german environment, "prénom" in a french environment, and so on.

To use a localized string in an html-file, you can use one of the attributes *t* or *i18n*:

```html
<template>
  <h1 t="patients.firstname">First name</h1>
</template>
```

This snippet will show a H1-heading with "Vorname" in a german environment, "prénom" in a french environment and so on.
If no matching language key is found, it will show "First name" - the default.
