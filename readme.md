# Webelexis for Elexis-Server quick start

## Prerequisites

* Git
* Docker
* NodeJS

## Installation:

```
git clone htts://github.com/rgwch/webelexis-es
cd webelexis-es
npm install
```

## Preparation

* Open a terminal and launch the elexis server:

```
./rundocker.sh
```

* Grab your mobile phone and get 'Google Authenticator' from the App Store/Play Store.

* Launch your favourite browser and navigate to the [Elexis-Server-Wiki](https://github.com/elexis/elexis-server/wiki/SMART-on-FHIR). Scroll down to the Admin-QR-Code for the demo database and youse this as a seed for the Google Authenticator App.


* Navigate to <http://localhost:8380/openid> and log in as **Administrator** with the Password **Admin** and a 2FA-token generated from your mobile app.

* Go to **manage clients** and add a **new client**. 

## Launch and use

```
au run --watch
``` 

navigate to <http://localhost:9000>
