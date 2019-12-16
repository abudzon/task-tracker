import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';

const ROUTES = [
  {
    path: '',
    component: TasksComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
