export class configuration {

  default = require('../config/config.json');

  constructor()
  {
    console.log('Configuration loaded:', JSON.stringify(this.default));
  }
}
