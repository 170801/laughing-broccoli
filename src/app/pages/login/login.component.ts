import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
// import { FirebaseApp } from '@angular/fire';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';
// import { WindowService } from '../../services/window/window.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  // providers: [WindowService]
})
export class LoginComponent implements OnInit {

  // uiConfig = {
  //   signInSuccessUrl: 'home',
  //   signInOptions: [
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //     firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  //   ]
  // };
  // ui = new firebaseui.auth.AuthUI(firebase.auth(), this.firebaseApp.name);

  // windowRef: any;

  form = new FormGroup({
    // phone: new FormControl(null, [Validators.pattern(/\+[0-9]{11}/), Validators.required]),
    mail: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });
  alert = '';
  alerts = {
    user: () => 'No matching email/password pair found.',
    server: () => 'The service is unavailable',
    false: () => ''
  };

  @HostListener('document:keydown.enter') onEnter(): void{
    this.login();
  }

  constructor(private router: Router, private auth: AuthService
            // , private win: WindowService
            // , @Inject(FirebaseApp) private firebaseApp: firebase.app.App
            ) { }

  ngOnInit(): void {
    this.auth.logout();
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', undefined, this.firebaseApp);
    // this.windowRef.recaptchaVerifier.render();

    // this.ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  // login(): void {
  //   if (this.form.invalid){
  //     return;
  //   }
  //   this.auth.login(this.form.value.phone, this.windowRef.recaptchaVerifier).then(
  //     result => {
  //       console.log(result);

  //       // this.navTo('/home');
  //     }
  //   );
  // }

  login(): void {
    if (this.form.invalid){
      return;
    }
    this.auth.login(this.form.value.mail, this.form.value.password).then(
      result => {
        this.navTo('/home');
      },
      (error) => {
        this.alert = (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')
          ? this.alerts.user() : this.alerts.server();
      }
    );
  }

}
