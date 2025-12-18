import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the title in the DOM @Input', () => {
    component.title = 'Ma tâche';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Ma tâche');
  });

  it('should have empty string in default', () => {
    expect(component.title).toBe('');
  })

  it('should emit nothing on close', () => {
    const spy = spyOn(component.closed, 'emit');

    component.close();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
  })
});
