import { Component, ViewChild} from '@angular/core';
import { Call } from '../../shared/models/call.model';
import { TableComponent } from '../../shared/components/table/table.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CallService } from '../../services/calls/calls.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth/auth.service';
import { PhoneNumberService } from 'src/app/services/phoneNumbers/phoneNumbers.service';

@Component({
  selector: 'app-incoming',
  templateUrl: '../../shared/templates/table.component.html',
  styleUrls: ['../../shared/components/table/table.component.scss']
})
export class IncomingComponent extends TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['select', 'number', 'start', 'duration'];
  constructor(dialog: MatDialog, service: CallService, firestore: AngularFirestore, auth: AuthService, pns: PhoneNumberService) {
    super(dialog, service, firestore, auth, pns);
  }
  filterData(): Call[] {
    return super.filterData().filter(call => {
      return call.caller === call.number;
    });
  }
}
