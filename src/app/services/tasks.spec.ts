import { TestBed } from '@angular/core/testing';

import { Tasks } from './tasks';

describe('Tasks Service', () => {
  let service: Tasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tasks);
    service.clearTasks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    service.addTask('Do Test');

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].label).toBe('Do Test');
    expect(tasks[0].completed).toBe(false);
  })

  it('should delete a task', () => {
    service.addTask('Task to delete');
    const taskId = service.getTasks()[0].id;
    service.deleteTask(taskId);
    expect(service.getTasks().length).toBe(0);
  })

  it('should complete a task', () => {
    service.addTask('Task to complete');
    const taskId = service.getTasks()[0].id;
    service.toggleCompleted(taskId);

    const task = service.getTasks()[0];
    expect(task.completed).toBe(true);
  });

  it('should edit the label of a task', () => {
    service.addTask('Task to edit');
    const taskId = service.getTasks()[0].id;
    const newLabel = 'Label edited';

    service.editTask(taskId, newLabel);
    const task = service.getTasks()[0];
    expect(task.label).toBe('Label edited');
  });

});
