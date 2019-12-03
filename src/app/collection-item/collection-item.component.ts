import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.css']
})
export class CollectionItemComponent implements OnInit {
  @Input () theme;
  @Input() index;
  constructor() { }

  ngOnInit() {
  }

}
