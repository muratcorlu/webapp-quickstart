import angular from 'angular';
import 'angular-i18n/angular-locale_tr-tr';
import uirouter from 'angular-ui-router';

import routing from './router';

import myappRegime from './myappRegime';
import HomeRep from './Home/HomeRep';

angular.module('myapp', [uirouter])
  .config(routing)

  // Cok cirkin \/\/\/\/
  .service('myappRegime', myappRegime)
  .controller('HomeRep', HomeRep);
