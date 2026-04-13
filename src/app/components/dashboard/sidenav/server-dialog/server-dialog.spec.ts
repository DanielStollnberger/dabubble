import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDialog } from './server-dialog';

describe('ServerDialog', () => {
  let component: ServerDialog;
  let fixture: ComponentFixture<ServerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
