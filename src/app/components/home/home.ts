import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Task, Tasks} from '../../services/tasks';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  taskService = inject(Tasks);

  tasks: Observable<Task[]> = this.taskService.getTask();
  interval: number | undefined;
  count = 0;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.count ++;
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
