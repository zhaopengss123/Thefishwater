import { NgModule } from '@angular/core';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { TimetableperiodComponent } from "./timetableperiod/timetableperiod.component";
import { ClassroomComponent }from "./classroom/classroom.component";
const routes: Routes = [
  {
    path: 'timetableperiod',
    data: { title: '排课时段' },
    component: TimetableperiodComponent,
  },
  {
    path: 'classroom',
    data: { title: '上课教室' },
    component: ClassroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrsetingRoutingModule { }
