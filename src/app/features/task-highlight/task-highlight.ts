import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule, X} from 'lucide-angular';

@Component({
  selector: 'app-task-highlight',
  imports: [LucideAngularModule],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  readonly CloseIcon = X;
  @Input() title = '';

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
