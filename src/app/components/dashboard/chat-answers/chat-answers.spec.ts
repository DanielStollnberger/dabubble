import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAnswers } from './chat-answers';

describe('ChatAnswers', () => {
  let component: ChatAnswers;
  let fixture: ComponentFixture<ChatAnswers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAnswers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAnswers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
