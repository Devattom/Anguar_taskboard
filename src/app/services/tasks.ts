import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Task = {
  id: number;
  label: string;
}
@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private taskSubject = new BehaviorSubject<Task[]>([
    {id: 1, label: 'Première tâche'},
    {id: 2, label: 'Deuxième tâche'},
    {id: 3, label: 'Troisieme tâche'},
  ]);

  tasks$ = this.taskSubject.asObservable();

  addTask(label: string) {
    const currentTasks = this.taskSubject.getValue();

    const lastId = currentTasks.length > 0
      ? currentTasks[currentTasks.length - 1].id
      : 0;

    const newTask: Task = {
      id: lastId + 1,
      label: label,
    };

    this.taskSubject.next([...currentTasks, newTask]);
  }
}
