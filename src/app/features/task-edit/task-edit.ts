import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../services/tasks';

@Component({
  selector: 'app-task-edit',
  imports: [],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEdit {
  @Output() edited = new EventEmitter<string>();

  edit(newLabel: string) {
    this.edited.emit(newLabel);
  }
}
