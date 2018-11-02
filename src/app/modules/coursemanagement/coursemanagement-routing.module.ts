import { NgModule } from '@angular/core';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumtypeComponent } from "./curriculumtype/curriculumtype.component";
import { CurrcategoryComponent } from "./currcategory/currcategory.component";
import { ListeditorComponent } from "./listeditor/listeditor.component";

const routes: Routes = [{
  path: 'curriculumtype',
  data: { title: '课程类型设置' },
  component: CurriculumtypeComponent,
},{
    path: 'Currcategory',
    data: { title: '课程类别设置' },
    component: CurrcategoryComponent,
  }, {
    path: 'listeditor',
    data: { title: '课程管理' },
    component: ListeditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursemanagementRoutingModule { }
