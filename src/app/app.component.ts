import { Component } from '@angular/core';
import { TitleService } from './services/routing/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'usage-management';
  constructor(private service: TitleService){
    this.service.refreshTitle();
  }
}
