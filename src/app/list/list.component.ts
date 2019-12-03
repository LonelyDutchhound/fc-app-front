import { Component, Input, OnInit } from '@angular/core';
import {ITheme} from '../main/main.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input () themes: ITheme[];
  constructor() { }

  ngOnInit() {
  }

}
