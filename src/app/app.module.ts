import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardService} from './core/services/dashboard.service';
import {SpacexCardSectionComponent} from './core/components/spacex-section/spacex-card-section.component';
import {SpacexCardComponent} from './core/components/spacex-card/spacex-card.component';
import {SpacexFilterComponent} from './core/components/spacex-filter/spacex-filter.component';
import {HttpClientModule} from '@angular/common/http';
import {NoDataToDisplayComponent} from './shared/components/no-data-to-display/no-data-to-display.component';
import { SpacexFilteredCardSectionComponent } from './core/components/spacex-filtered-card-section/spacex-filtered-card-section.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacexCardSectionComponent,
    SpacexCardComponent,
    SpacexFilterComponent,
    NoDataToDisplayComponent,
    SpacexFilteredCardSectionComponent,
    PageNotFoundComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
