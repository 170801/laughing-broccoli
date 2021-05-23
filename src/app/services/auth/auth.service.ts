import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  async currentUser(): Promise<any> {
    return this.auth.currentUser;
  }

  // login(phone: string, verifier: firebase.default.auth.ApplicationVerifier): Promise<any> {
  //   return this.auth.signInWithPhoneNumber(phone, verifier);
  // }

    login(email: string, password: string): Promise<any> {
      return this.auth.signInWithEmailAndPassword(email, password);
  }

  currentUserObservable(): Observable<any> {
    return this.auth.authState;
  }

  authenticated(): boolean {
    return this.auth.authState !== null;
}

  async newPassword(newPassword: string): Promise<void> {
    return this.auth.currentUser.then((user) => {
      return user?.updatePassword(newPassword);
    });
  }

  passwordRemind(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }

  async updateCurrentUserName(name: string): Promise<void> {
    return this.auth.currentUser.then((user) => {
      return user?.updateProfile({
        displayName: name
      });
    });
  }

  async updateCurrentEmail(mail: string): Promise<void> {
    return this.auth.currentUser.then((user) => {
      return user?.updateEmail(mail);
    });
  }

  createUser(email: string, password: string, name?: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      if (name) {
        this.updateCurrentUserName(name);
      }
      return result.user;
    });
  }

}
