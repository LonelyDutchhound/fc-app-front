import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges {
  @Input () item;
  @Input() index;

  itemForm: FormGroup;

  isEdited: boolean;
  isCard: boolean;

  itemId: string;
  itemTitle: string;
  itemDescription: string;

  constructor() {
    this.isEdited = false;
  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      id: new FormControl(this.itemId ),
      title: new FormControl(this.itemTitle ),
      description: new FormControl(this.itemDescription )
    });
  }

  ngOnChanges() {
    this.itemId = this.item._id;
    this.itemTitle = this.item.title;
    this.itemDescription = this.item.description;
    this.isCard = !!this.item.theme;
  }

  onSubmit() {
    console.log(this.itemForm);
  }
}
