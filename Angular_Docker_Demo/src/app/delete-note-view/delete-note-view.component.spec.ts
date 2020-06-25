import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteViewComponent } from './delete-note-view.component';

describe('DeleteNoteViewComponent', () => {
  let component: DeleteNoteViewComponent;
  let fixture: ComponentFixture<DeleteNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteNoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
