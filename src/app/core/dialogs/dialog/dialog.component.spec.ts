import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedDialogComponent } from './dialog.component';

describe('RoutedDialogComponent', () => {
  let component: RoutedDialogComponent;
  let fixture: ComponentFixture<RoutedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
