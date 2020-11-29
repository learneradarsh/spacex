import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpacexCardSectionComponent} from './core/components/spacex-section/spacex-card-section.component';
import {SpacexFilteredCardSectionComponent} from './core/components/spacex-filtered-card-section/spacex-filtered-card-section.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: SpacexCardSectionComponent },
  {path: 'filtered-data/:param', component: SpacexFilteredCardSectionComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
