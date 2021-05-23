import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PhoneNumberService } from 'src/app/services/phoneNumbers/phoneNumbers.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  user!: any;
  number!: any;
  alert!: any;
  success!: any;
  name = new FormControl(null, [Validators.required, Validators.pattern(/[A-Z][a-z]{2,}( [A-Z][a-z]{2,})+/)]);
  phone = new FormControl({value: null, disabled: true}, [Validators.pattern(/\+[0-9]{11}/), Validators.required]);
  mail = new FormControl(null, [Validators.email, Validators.required]);
  password0 = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  password = new FormControl(null, [Validators.minLength(8)]);
  password1 = new FormControl(null, [Validators.minLength(8)]);

  passwordsMatch: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const pw = control.get('password');
    const pw1 = control.get('password1');

    return (pw && pw1 && pw.value === pw1.value) ||
    String(pw?.value).length === 0 || String(pw1?.value).length === 0 ? null : { notMatching: true };
  }

  // tslint:disable-next-line: member-ordering
  form = new FormGroup({
    name: this.name,
    phone: this.phone,
    mail: this.mail,
    password0: this.password0,
    password: this.password,
    password1: this.password1
  }, {validators: this.passwordsMatch});

  constructor(private router: Router, private auth: AuthService, private firestore: AngularFirestore,
              protected phoneService: PhoneNumberService, public dialogRef: MatDialogRef<SettingsComponent>) {
                this.auth.currentUser().then(e => {
                  this.user = e;
                  this.name.setValue(e.displayName);
                  this.mail.setValue(e.email);
                  this.number = this.phoneService.getPhoneNumbers().subscribe(l => {
                    const all = l.map((item: { payload: { doc: { id: string; data: () => {user: string, phoneNumber: string} }}}) => {
                      if (item.payload.doc.data().user === this.user?.uid){
                        return item.payload.doc.data().phoneNumber;
                      }else{
                        return;
                      }
                    });
                    this.number.unsubscribe();
                    this.number = all.filter((x: any) => x)[0];
                    this.phone.setValue(this.number);
                  });
                } );
  }

  save(): void{
    this.auth.login(this.user.email, this.password0.value).then(
      success => {
        if (this.name.value !== this.user.displayName){
          this.auth.updateCurrentUserName(this.name.value.trim());
        }
        if (this.mail.value !== this.user.email){
          this.auth.updateCurrentEmail(this.mail.value);
        }
        if (this.password.value){
          this.auth.newPassword(this.password.value);
        }
        this.success = 'Changes saved.';
        const f = (_: any) => { this.success = null; setTimeout(() => this.dialogRef.close(), 500); };
        setTimeout(f, 1000);
      },
      failure => {
        const i = this.password0.valueChanges.subscribe(
          e => {
            i.unsubscribe();
            this.alert = null;
          }
          );
        this.alert = failure.code === 'auth/wrong-password' ? 'Old password incorrect.' : null;

      }
    );
  }

}
