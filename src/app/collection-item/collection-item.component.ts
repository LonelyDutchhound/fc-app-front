import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITheme} from '../../interfaces';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.css']
})
export class CollectionItemComponent implements OnInit {
  itemForm: FormGroup;
  isEdited: boolean;
  private _item = null;

  @Input ()
  set item(item: ITheme) {
    this._item = item;
  }
  get item(): ITheme {
    return this._item;
  }
  @Input() index;
  @Output() setCurrentCollection = new EventEmitter<string>();

  constructor() {
    this.isEdited = false;
  }

  ngOnInit() {
    this.itemForm = new FormGroup({
      id: new FormControl(this.item._id),
      title: new FormControl(this.item.title),
      description: new FormControl(this.item.description)
    });
  }

  onSelectCollection() {
    this.setCurrentCollection.emit(this.item._id);
  }

  onSubmit() {
    console.log(this.itemForm);
  }
}
