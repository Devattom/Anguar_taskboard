import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task-edit',
  imports: [],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEdit {
  @Input() initialLabel = '';
  @Output() edited = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  edit(newLabel: string) {
    this.edited.emit(newLabel);
  }

  cancel() {
    this.cancelled.emit();
  }
}
