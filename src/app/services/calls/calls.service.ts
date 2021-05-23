import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Call } from '../../shared/models/call.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  formData!: Call;

  constructor(private firestore: AngularFirestore) { }

  getCalls(): Observable<any> {
    return this.firestore.collection('calls').snapshotChanges();
  }
}
