import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlesSelectionChipsComponent } from './titles-selection-chips.component';

describe('TitlesSelectionChipsComponent', () => {
  let component: TitlesSelectionChipsComponent;
  let fixture: ComponentFixture<TitlesSelectionChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitlesSelectionChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlesSelectionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
