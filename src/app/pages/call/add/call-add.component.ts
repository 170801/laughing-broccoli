import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CallService } from '../../../services/calls/calls.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Call } from '../../../shared/models/call.model';
import { AuthService } from '../../../services/auth/auth.service';
import { PhoneNumberService } from '../../../services/phoneNumbers/phoneNumbers.service';
import { MyTel } from 'src/app/shared/components/phone-input/phone-input.component';

@Component({
  selector: 'app-call-add',
  templateUrl: './call-add.component.html',
  styleUrls: ['./call-add.component.scss']
})
export class CallAddComponent {

  id = new FormControl('');
  caller = new FormControl('', Validators.required);
  receipient = new FormControl({value: '', disabled: true}, Validators.required);
  start = new FormControl(null, Validators.required);
  stop = new FormControl(null, Validators.required);

  form = new FormGroup({
    id: this.id,
    caller: this.caller,
    receipient: this.receipient,
    start: this.start,
    stop: this.stop
  });

  user!: any;
  phoneNumber!: any;

  incoming = new FormControl(true);
  outgoing = false;
  title = 'Record call';
  save = 'RECORD';

  constructor(public service: CallService,
              private firestore: AngularFirestore,
              public dialogRef: MatDialogRef<CallAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {call: Call},
              private auth: AuthService, protected phoneService: PhoneNumberService) {
                this.auth.currentUser().then(e => {
                  this.user = e;
                  this.phoneNumber = this.phoneService.getPhoneNumbers().subscribe(l => {
                    const all = l.map((item: { payload: { doc: { id: string; data: () => {user: string, phoneNumber: string} }}}) => {
                      if (item.payload.doc.data().user === this.user?.uid){
                        return item.payload.doc.data().phoneNumber;
                      }else{
                        return;
                      }
                    });
                    this.phoneNumber.unsubscribe();
                    this.phoneNumber = all.filter((x: any) => x)[0];
                    this.incoming.setValue(this.myTelString(this.caller.value) !== this.phoneNumber);
                    console.log(this.caller.value);
                    console.log(this.phoneNumber);


                    if (this.incoming.value){
                      if (data.call.caller){
                        this.caller.setValue(data.call.caller);
                      }
                      this.receipient.disable(), this.caller.enable();
                      this.receipient.setValue(this.toMyTelFormat(this.phoneNumber));
                    }else{
                      this.receipient.enable(), this.caller.disable();
                      this.caller.setValue(this.toMyTelFormat(this.phoneNumber));
                    }
                    this.incoming.valueChanges.subscribe(i => {
                      this.outgoing = !i;
                      const ph = this.caller.value;
                      this.caller.setValue(this.receipient.value);
                      this.receipient.setValue(ph);
                      if (this.caller.disabled){
                        this.caller.enable(),
                        this.receipient.disable();
                      }else{
                        this.caller.disable(),
                        this.receipient.enable();
                      }
                    });
                  });
                } );
                if (data.call.caller){
                  this.id.setValue(data.call.id);
                  this.caller.setValue(this.toMyTelFormat(data.call.caller));
                  this.receipient.setValue(this.toMyTelFormat(data.call.receipient));
                  this.start.setValue(new Date(data.call.start + 'Z').toISOString().substr(0, 16));
                  this.stop.setValue(new Date(data.call.stop + 'Z').toISOString().substr(0, 16));
                  this.title = 'Modify call record';
                  this.save = 'SAVE';
                }
  }

  toMyTelFormat(phoneNumber: string): MyTel {
    return {
      area: phoneNumber.substr(0, 3),
      exchange: phoneNumber.substr(3, 2),
      subscriber: phoneNumber.substr(5, 3),
      subscriber2: phoneNumber.substr(8)
    };
  }

  myTelString(ret: MyTel): string {
    return ret.area + ret.exchange + ret.subscriber + ret.subscriber2;
  }

}
