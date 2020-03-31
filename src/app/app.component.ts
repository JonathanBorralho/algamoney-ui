import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true
})
export class AppComponent implements OnInit {
  items = [];
  ngOnInit() {
    this.items = [
      {label: 'Lançamentos', icon: 'pi pi-fw pi-chart-bar'},
      {label: 'Pessoas', icon: 'pi pi-fw pi-users'},
      {label: 'Logout', icon: 'pi pi-fw pi-sign-out'}
    ];
  }
}
