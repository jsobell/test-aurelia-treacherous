import {createGroup, createRuleset, ValidationGroup, ruleRegistry} from "treacherous"
import {PromiseDelayedValidationRule} from "./promiseRule";
//import {ValidationStrategy} from "treacherous-aurelia";
export class Welcome {

  heading: string = 'Welcome to the Aurelia Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  valgrp:ValidationGroup;

  user = { first:'', last:'' };

  constructor() {

    var vd = new PromiseDelayedValidationRule();
    ruleRegistry.registerRule(vd);

    var ruleset = createRuleset()
      .forProperty("first")
      .addRule("required",null)      // The property is required
      .addRule("maxLength", 10)    // The property needs a length <= 10
      .addRule("minLength", 5)     // The property needs a length >= 5
      .addRule("slowthing", 700)  // The rule will take 2 seconds to validate!
      .forProperty("last")
      .addRule("minLength", 5)     // The property needs a length <= 5
      .build();

    this.valgrp = createGroup(this.user, ruleset);

    //this.setValid();
  }

  setValid() {
    this.setuser({ first:'Alfred', last:'Einstein' });
  }

  setInvalid() {
    this.setuser({ first:'Bob', last:'Hope' });
  }

  setuser(u) {
    this.user = u;
    this.valgrp.changeValidationTarget(this.user);
    //Object.assign(this.user , u);
  }

  get fullName(): string {
    if (this.user)
      return `${this.user.first} ${this.user.last}`;
    return "";
  }

  submit() {
    this.valgrp.isValid().then(y => {
      if (y) {
        alert(`Welcome, ${this.fullName}!`);
      }
    });
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
