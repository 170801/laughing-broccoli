import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  passwordsMatch: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const pw = control.get('password');
    const pw1 = control.get('password1');

    return (pw && pw1 && pw.value === pw1.value) ||
    String(pw?.value).length === 0 || String(pw1?.value).length === 0 ? null : { notMatching: true };
  }

  // tslint:disable-next-line: member-ordering
  form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-z]{2,}( [A-Z][a-z]{2,})+/)]),
    phone: new FormControl(null, [Validators.pattern(/\+[0-9]{11}/), Validators.required]),
    mail: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    password1: new FormControl(null, [Validators.required, Validators.minLength(8)])
  }, {validators: this.passwordsMatch});

  constructor(private router: Router, private auth: AuthService, private firestore: AngularFirestore) { }

  registration(): void {
    if (this.form.valid){
      console.log('ok');
      this.auth.createUser(this.form.value.mail, this.form.value.password, this.form.value.name)
      .then(e => this.firestore.collection('phoneNumbers').add({user: e.uid, phoneNumber: this.form.value.phone}));
      // this.router.navigateByUrl('login');
    }
  }

}
