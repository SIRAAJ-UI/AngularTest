import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { MuseumGalleryComponent } from './museum-gallery/museum-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCardComponent,
    MuseumGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
