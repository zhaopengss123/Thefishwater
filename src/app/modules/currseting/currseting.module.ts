import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from './../../ng-relax/ng-relax.module';

import { CurrsetingRoutingModule } from './currseting-routing.module';
import { TimetableperiodComponent } from './timetableperiod/timetableperiod.component';
import { ClassroomComponent } from './classroom/classroom.component';

@NgModule({
  imports: [
    CommonModule,
    CurrsetingRoutingModule,
    NgRelaxModule
  ],
  declarations: [TimetableperiodComponent, ClassroomComponent]
})
export class CurrsetingModule { }
