import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { MuseumGalleryComponent } from './museum-gallery/museum-gallery.component';
import { DepartmentComponent } from './department/department.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    ImageCardComponent,
    MuseumGalleryComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
