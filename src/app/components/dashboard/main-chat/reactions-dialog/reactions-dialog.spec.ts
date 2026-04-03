import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsDialog } from './reactions-dialog';

describe('ReactionsDialog', () => {
  let component: ReactionsDialog;
  let fixture: ComponentFixture<ReactionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
