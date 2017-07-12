import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {BasicComponent} from './basic.component';
import {NotFoundComponent} from './not-found.component';


@NgModule({
  declarations: [BasicComponent, NotFoundComponent],
  imports: [BrowserModule, RouterModule],
  exports: [BasicComponent, NotFoundComponent]
})

export class LayoutsModule {
}
