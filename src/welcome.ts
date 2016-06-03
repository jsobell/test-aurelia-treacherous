import {createGroup, createRuleset,ValidationGroup } from "treacherous"
//import {ValidationStrategy} from "treacherous-aurelia";
export class Welcome {

  heading: string = 'Welcome to the Aurelia Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  valgrp:ValidationGroup;

  user = {};
  
  constructor() {

    this.setValid();

    var ruleset = createRuleset()
      .forProperty("first")
      .addRule("required",{})      // The property is required
      .addRule("maxLength", 10)    // The property needs a length <= 10
      .addRule("minLength", 5)     // The property needs a length >= 5
      .forProperty("last")
      .addRule("minLength", 5)     // The property needs a length <= 5
      .build();

    this.valgrp = createGroup(this.user, ruleset);
    console.log(this.valgrp);
    console.warn(this.user);
  }

  setValid() {
    this.user = { first:'Alfred', last:'Einstein' };
  }
  
  setInvalid() {
    this.user = { first:'Bob', last:'Hope' };
  }
  
  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return '?';
    //return `${this.user.first} ${this.user.last}`;
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
