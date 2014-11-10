angular.module('firebase.config', [])
  .constant('FBURL', 'https://observer-dev.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google','github'])

  .constant('loginRedirectPath', '/login');