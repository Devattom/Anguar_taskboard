import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPage } from './tasks-page';
import {BehaviorSubject} from 'rxjs';
import {Task, Tasks} from '../../services/tasks';


class MockTaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(label: string): void {
    const newTask = { id: 1, label, completed: false };
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next([...tasks, newTask]);
  }

  deleteTask(id: number): void {
    // Simulation simple, pas de vraie logique
  }
}

describe('TasksPage avec Mock', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let mockService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        { provide: Tasks, useClass: MockTaskService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    mockService = TestBed.inject(Tasks) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a task but with mock', () => {
    component.addTask('mocked task');

    mockService.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].label).toBe('mocked task');
    });
  });
});
