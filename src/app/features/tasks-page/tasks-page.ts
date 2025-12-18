import {
  Component,
  ComponentRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
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
  imports: [AsyncPipe, FormsModule, LucideAngularModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage implements OnInit, OnDestroy {
  readonly Trash = Trash;
  readonly Pencil = Pencil;

  @ViewChild('highlightContainer', {read: ViewContainerRef}) highlightContainer!: ViewContainerRef;

  @ViewChild('editContainer', {read: ViewContainerRef}) editContainer!: ViewContainerRef;

  taskService = inject(Tasks);
  tasks: Observable<Task[]> = this.taskService.tasks$;
  doneTasks: Observable<Task[]> = this.taskService.doneTasks$;
  inProgressTasks: Observable<Task[]> = this.taskService.inProgressTasks$;

  newTaskLabel : string = '';

  private highlightRef?: ComponentRef<TaskHighlight>;
  private editRef?: ComponentRef<TaskEdit>;

  ngOnInit() {}

  ngOnDestroy() {
    this.highlightRef?.destroy();
    this.editRef?.destroy();
  }

  highlight(task: Task) {
    this.highlightContainer.clear();
    this.highlightRef = this.highlightContainer.createComponent(TaskHighlight)
    this.highlightRef.instance.title = task.label;

    this.highlightRef.instance.closed.subscribe(() => {
      this.highlightRef?.destroy();
      this.highlightRef = undefined;
    })
  }

  editTask(taskId: number) {
    this.editContainer.clear();

    this.editRef = this.editContainer.createComponent(TaskEdit);

    this.editRef?.instance.edited.subscribe((label) => {
      this.taskService.editTask(taskId, label);
      this.editRef?.destroy();
      this.editRef = undefined;
    });
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
