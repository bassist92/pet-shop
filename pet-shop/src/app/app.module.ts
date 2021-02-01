import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CacheService } from './_services/cache.service';
import { HttpService } from './_services/http.service';
import { RecipeService } from './_services/recipe.service';

import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { DataService } from './_services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    CacheService,
    DataService,
    HttpService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
