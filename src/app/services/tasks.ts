import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

export type Task = {
  id: number;
  label: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private taskSubject = new BehaviorSubject<Task[]>([
    {id: 1, label: 'Première tâche', completed: false},
    {id: 2, label: 'Deuxième tâche', completed: false},
    {id: 3, label: 'Troisieme tâche', completed: false},
  ]);

  tasks$ = this.taskSubject.asObservable();

  doneTasks$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.completed)),
  );

  inProgressTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed)),
  );

  addTask(label: string) {
    const currentTasks = this.taskSubject.getValue();

    const lastId = currentTasks.length > 0
      ? currentTasks[currentTasks.length - 1].id
      : 0;

    const newTask: Task = {
      id: lastId + 1,
      label: label,
      completed: false
    };

    this.taskSubject.next([...currentTasks, newTask]);
  }

  deleteTask(id: number) {
    const currentTasks = this.taskSubject.getValue();

    this.taskSubject.next(
      currentTasks.filter((task) => task.id !== id)
    );
  }

  toggleCompleted(id: number) {
    this.taskSubject.next(
      this.taskSubject.getValue().map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  editTask(id: number, newLabel: string) {
    this.taskSubject.next(
      this.taskSubject.getValue().map(task =>
        task.id === id
          ? { ...task, label: newLabel }
          : task
      )
    );
  }
}
