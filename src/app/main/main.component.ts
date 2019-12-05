import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

export interface ICard {
  id: string;
  title: string;
  description: string;
}

export interface ITheme {
  _id: string;
  title: string;
  description: string;
}

interface IThemeQuery {
  themes: ITheme[];
}

interface ICardQuery {
  cards: ICard[];
}

const themeQuery = gql`{
    themes {
        _id
        title
        description
    }
}`;

const cardQuery = gql`{
    cards {
        _id
        title
        description
        theme
    }
}`;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  loading: boolean;
  themes: ITheme[];
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
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
