import * as Promise from "bluebird";
import {IValidationRule} from "treacherous";

export class PromiseDelayedValidationRule implements IValidationRule {
  public ruleName = "slowthing";

  public validate(value, delay:number):Promise<boolean> {
    console.log('VALIDATING...');

    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        console.log('...VALIDATED!');
        resolve(true);
      }, delay);
    });
  }

  public getMessage(value, options) {
    return "That was slow...";
  }
}
