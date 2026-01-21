import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {Task, Tasks } from "../../services/tasks";
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe } from '@angular/common';
import {TaskHighlight} from '../task-highlight/task-highlight';
import {LucideAngularModule, Trash, Pencil} from 'lucide-angular';
import {TaskEdit} from '../task-edit/task-edit';

@Component({
  selector: 'app-tasks-page',
  imports: [AsyncPipe, FormsModule, LucideAngularModule, TaskHighlight, TaskEdit],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit {
  readonly Trash = Trash;
  readonly Pencil = Pencil;

  taskService = inject(Tasks);
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  newTaskLabel : string = '';

  highlightedTask = signal<Task | undefined>(undefined);
  editingTask = signal<Task | undefined>(undefined);

  ngOnInit() {}

  highlight(task: Task) {
    this.highlightedTask.set(task);
  }

  editTask(task: Task) {
    this.editingTask.set(task);
  }

  onTaskEdited(label: string) {
    const task = this.editingTask();
    if (task) {
      this.taskService.editTask(task.id, label);
      this.editingTask.set(undefined);
    }
  }

  addTask(label: string) {
    this.taskService.addTask(label);
    this.newTaskLabel = '';
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  toggleCompleted(taskId: number) {
    this.taskService.toggleCompleted(taskId);
  }
}
