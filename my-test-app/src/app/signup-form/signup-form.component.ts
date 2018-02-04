import { UsernameValidators } from './username.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  myForm = new FormGroup({
    account: new FormGroup({
      'username': new FormControl('',
        [Validators.required, Validators.minLength(3), UsernameValidators.cannotContainSpace],
        UsernameValidators.shouldBeUnique),
      'password': new FormControl('', Validators.required)
    })

  })

  login() {
    let isValid = false;//authService.login(this.myForm.value);
    if (!isValid) {
      this.myForm.setErrors({
        invalidLogin: true
      });
    }
  }

  get username() {
    return this.myForm.get('account.username');
  }

}
