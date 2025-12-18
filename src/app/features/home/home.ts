import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Task, Tasks} from '../../services/tasks';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
