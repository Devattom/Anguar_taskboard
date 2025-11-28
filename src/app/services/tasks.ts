import { Injectable } from '@angular/core';
import {delay, of} from 'rxjs';

export type Task = {
  id: number;
  label: string;
}
@Injectable({
  providedIn: 'root',
})
export class Tasks {
  tasks: Task[] = [
    {id: 1, label: 'Première tâche'},
    {id: 2, label: 'Deuxième tâche'},
    {id: 3, label: 'Troisieme tâche'},
  ];

  getTask() {
    return of(this.tasks).pipe(delay(1000));
  }
}
