import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { ICard, ICardQuery, ITheme, IThemeQuery } from '../../interfaces';

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

  loading: boolean;
  themes: ITheme[];
  private _currentCollection: string;
  cards: ICard[];
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<IThemeQuery>({
        query: themeQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.themes = data.themes;
      });
    this._currentCollection = '';
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  async onSetCurrentCollection(themeId) {
    this._currentCollection = themeId;
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
}
