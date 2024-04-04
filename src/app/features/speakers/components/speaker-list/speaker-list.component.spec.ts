import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerListComponent } from './speaker-list.component';

describe('SpeakerListComponent', () => {
  let component: SpeakerListComponent;
  let fixture: ComponentFixture<SpeakerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
