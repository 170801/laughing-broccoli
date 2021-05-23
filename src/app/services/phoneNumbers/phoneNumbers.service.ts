import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor(private firestore: AngularFirestore) { }

  getPhoneNumbers(): Observable<any> {
    return this.firestore.collection('phoneNumbers').snapshotChanges();
  }
  getPhoneNumber(uid: string): Promise<any> {
    return this.firestore.collection('phoneNumbers').get().toPromise();
  }
}
