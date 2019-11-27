import { Component, OnInit, OnDestroy } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

interface ICard {
  id: string;
  title: string;
  description: string;
}

interface IQuery {
  cards: ICard[];
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  loading: boolean;
  someCard: ICard[];
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo
    .watchQuery<IQuery>({
      query: gql`{
        cards {
          id
          title
          description
        }
      }
      `,
    })
    .valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.someCard = data.cards;
      console.log(this.loading, this.someCard);
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
