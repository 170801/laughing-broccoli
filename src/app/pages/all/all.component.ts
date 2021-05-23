import { Component, ViewChild} from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CallService } from '../../services/calls/calls.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth/auth.service';
import { PhoneNumberService } from 'src/app/services/phoneNumbers/phoneNumbers.service';

@Component({
  selector: 'app-all',
  templateUrl: '../../shared/templates/table.component.html',
  styleUrls: ['../../shared/components/table/table.component.scss']
})
export class AllComponent extends TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(dialog: MatDialog, service: CallService, firestore: AngularFirestore, auth: AuthService, pns: PhoneNumberService) {
    super(dialog, service, firestore, auth, pns);
  }
}
