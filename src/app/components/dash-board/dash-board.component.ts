import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import {ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';




@Component({
  selector: 'app-dash-board',
  imports: [SplitterModule, ButtonModule, MenuModule, CommonModule, RouterLink, ToolbarModule, InputTextModule,RouterOutlet],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  items: MenuItem[] | undefined;


  ngOnInit() {
      this.items = [
          {
              label: 'Update',
              icon: 'pi pi-refresh'
          },
          {
              label: 'Delete',
              icon: 'pi pi-times'
          }
      ];
  }



}
