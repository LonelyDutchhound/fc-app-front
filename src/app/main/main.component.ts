import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { ICard, ICardQuery, ITheme, IThemeQuery } from '../../interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { log } from 'util';

const themeQuery = gql`{
    themes {
        _id
        title
        description
    }
}`;

const cardQuery = gql`
    query cardQuery($themeId: String!) {
        cards(theme: $themeId) {
          _id
          title
          description
          theme
        }
    }
`;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private querySubscription: Subscription;
  currentCollection: string;

  addForm: FormGroup;
  loading: boolean;
  themes: ITheme[];
  cards: ICard[];
  isItemAdded: boolean;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.loading = true;
    this.querySubscription = this.apollo
      .watchQuery<IThemeQuery>({
        query: themeQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.themes = data.themes;
      });
    this.addForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      theme: new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  onSetCurrentCollection(themeId) {
    this.loading = true;
    this.currentCollection = themeId;
    console.log(cardQuery);
    this.querySubscription = this.apollo
      .watchQuery<ICardQuery>({
        query: cardQuery,
        variables: { themeId }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.cards = data.cards;
      });
  }

  onItemAdding() {
    this.isItemAdded = !this.isItemAdded;
  }

  onSubmit() {
    console.log(this.currentCollection)
    this.isItemAdded = !this.isItemAdded;
    console.log(this.addForm);
  }
}
