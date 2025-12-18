import { Routes } from '@angular/router';
import {Home} from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks-page/routes').then(m => m.TASKS_ROUTES )
  },
];
