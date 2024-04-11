import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerListItemComponent } from './speaker-list-item.component';

describe('SpeakerListItemComponent', () => {
  let component: SpeakerListItemComponent;
  let fixture: ComponentFixture<SpeakerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeakerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
