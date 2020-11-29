import { Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpacexCardSectionComponent} from './core/components/spacex-section/spacex-card-section.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
  developerName = 'Adarsh';
}
