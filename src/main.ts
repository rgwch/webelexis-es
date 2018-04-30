import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {I18N} from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import {Config} from './config'


let selectedLanguage = navigator['languages'][0] || navigator.language;
selectedLanguage = selectedLanguage.substr(0, 2);


export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-i18n', (instance) => {
      instance.i18next.use(Backend);
      return instance.setup({
        backend    : {
          loadPath: 'locales/{{lng}}/{{ns}}.json',
        },
        lng        : selectedLanguage,
        attributes : ['t', 'i18n'],
        fallbackLng: 'de',
        debug      : true
      });
    })
    .plugin('aurelia-dialog')


  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }


  aurelia.start().then(() => aurelia.setRoot());
}
