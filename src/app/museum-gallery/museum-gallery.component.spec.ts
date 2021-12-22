import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumGalleryComponent } from './museum-gallery.component';

describe('MuseumGalleryComponent', () => {
  let component: MuseumGalleryComponent;
  let fixture: ComponentFixture<MuseumGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseumGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
