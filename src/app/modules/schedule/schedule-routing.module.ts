import { NgModule } from '@angular/core';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { TimetableComponent } from "./timetable/timetable.component";
import { IntelligentComponent } from "./intelligent/intelligent.component";
import { AdjustmentComponent } from "./adjustment/adjustment.component";

const routes: Routes = [{
  path: 'list',
  data: { title: '教师学员课表' },
  component: ScheduleListComponent,
 
},
{
  path: 'timetable',
  data: { title: '课表展示' },
  component: TimetableComponent,
  },
  {
    path: 'intelligent',
    data: { title: '智能排课' },
    component: IntelligentComponent,
  },
  {
    path: 'adjustment',
    data: { title: '课表调整' },
    component: AdjustmentComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class ScheduleRoutingModule { }
