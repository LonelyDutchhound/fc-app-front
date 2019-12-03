import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudyComponent } from './study/study.component';
import { CollectionsComponent } from './collections/collections.component';
import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CardItemComponent } from './card-item/card-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    WelcomeComponent,
    StudyComponent,
    CollectionsComponent,
    PageNotFoundComponent,
    ListComponent,
    CollectionItemComponent,
    CardItemComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'study', component: StudyComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent}
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
