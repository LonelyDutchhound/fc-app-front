import { Component, Input, OnInit } from '@angular/core';
import { ICard, ITheme } from '../../interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  itemForm: FormGroup;
  isEdited: boolean;
  private _item: ICard;
  @Input ()
  set item(item: ICard ) {
    this._item = item;
  }
  get item(): ICard {
    return this._item;
  }
  @Input() index;

  constructor() {
    this.isEdited = false;
  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      id: new FormControl(this.item._id),
      title: new FormControl(this.item.title),
      description: new FormControl(this.item.description),
      theme: new FormControl(this.item.theme)
    });
  }

  onSubmit() {

  }

  onEdit() {

  }

  onDelete() {

  }

  onSelectCard() {

  }
}
