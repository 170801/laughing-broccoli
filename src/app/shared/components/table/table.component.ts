import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../services/auth/auth.service';
import { CallAddComponent } from '../../../pages/call/add/call-add.component';
import { CallService } from '../../../services/calls/calls.service';
import { CATEGORIES } from '../../database/categories.database';
import { Call } from '../../models/call.model';
import { PhoneNumberService } from 'src/app/services/phoneNumbers/phoneNumbers.service';

export class TableComponent {
  paginator!: MatPaginator;
  sort!: MatSort;
  user!: any;
  phoneNumber!: string;

  categories = CATEGORIES;
  displayedColumns: string[] = ['select', 'icon', 'number', 'start', 'duration'];
  calls: Call[] = [{caller: '', receipient: '', start: '', stop: ''}];
  dataSource = new MatTableDataSource(this.filterData());
  selection = new SelectionModel<Call>(true, []);

  filterData(): Call[] {
    return this.calls.filter(e => {
      return e.caller === this.phoneNumber || e.receipient === this.phoneNumber;
    });
  }

  protected constructor(protected dialog: MatDialog, protected callService: CallService, protected firestore: AngularFirestore,
                        protected auth: AuthService, protected phoneService: PhoneNumberService) {
    this.auth.currentUserObservable().subscribe(e => this.user = e );
    this.phoneService.getPhoneNumbers().subscribe(e => {
      const all = e.map((item: { payload: { doc: { id: string; data: () => {user: string, phoneNumber: string} }}}) => {
        if (item.payload.doc.data().user === this.user?.uid){
          return item.payload.doc.data().phoneNumber;
        }else{
          return;
        }
      });
      if (all){
        this.phoneNumber = all.filter((x: any) => x)[0];
      }
    });
    this.callService.getCalls().subscribe(actionArray => {
      this.calls = actionArray.map((item: { payload: { doc: { id: string; data: () => Call; }; }; }) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Call;
      });
      for (const call of this.calls) {
        call.duration = (new Date(call.stop) as any) - (new Date(call.start) as any);
        call.number = call.caller !== this.phoneNumber ? call.caller : call.receipient;
        call.start_ = new Date(call.start).toLocaleString('hu-HU');
      }
      this.dataSource = new MatTableDataSource(this.filterData());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(defdata: any = {data: {call: {}}}): void{
    const dialogRef = this.dialog.open(CallAddComponent, defdata);
    dialogRef.afterClosed().subscribe(res => {

      if (res && res.caller){
        const data = Object.assign({}, res);
        delete data.duration;
        delete data.id;
        delete data.number;
        delete data.start_;

        const caller = data.caller.area + data.caller.exchange + data.caller.subscriber + data.caller.subscriber2;
        const receipient = data.receipient.area +
        data.receipient.exchange + data.receipient.subscriber + data.receipient.subscriber2;
        data.caller = caller;
        data.receipient = receipient;
        if (res.id === ''){
          this.firestore.collection('calls').add(data);
        }else{
          this.firestore.collection('calls').doc(res.id).update(data);
        }
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  f2int(num: number): number {
    return parseInt(num.toString(), 10);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Call): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  removeSelected(): void {
    const remove = this.selection.selected;
    if (confirm('Are you sure you want to delete ' + remove.length + (remove.length > 1 ? ' records?' : ' record?'))) {
      this.masterToggle();
      if (this.isAllSelected()) {
        this.masterToggle();
      }
      remove.forEach(element => {
        this.calls.splice(this.calls.indexOf(element), 1);
        this.firestore.collection('calls').doc(element.id).delete();
      });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  modify(call: Call): void {
    this.openDialog({data: {call}});
  }

}
