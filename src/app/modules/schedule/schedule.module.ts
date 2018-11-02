import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { TimetableComponent } from './timetable/timetable.component';
import { IntelligentComponent } from './intelligent/intelligent.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    NgRelaxModule
  ],
  declarations: [ScheduleListComponent, TimetableComponent, IntelligentComponent, AdjustmentComponent]
})
export class ScheduleModule { }
