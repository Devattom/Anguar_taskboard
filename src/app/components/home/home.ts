import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Task, Tasks} from '../../services/tasks';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  taskService = inject(Tasks);
  tasks: Observable<Task[]> = this.taskService.tasks$;
  newTaskLabel : string = '';

  ngOnInit() {}

  ngOnDestroy() {}

  addTask(label: string) {
    this.taskService.addTask(label);
  }
}
