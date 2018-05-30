import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent} from './students/students.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';
import { ParentsComponent} from './parents/parents.component';
import { ParentStudentComponent} from './parent-student/parent-student.component';
import { TeachersComponent} from './teachers/teachers.component';
import { TeacherClassComponent} from './teacher-class/teacher-class.component';
import { TeacherStudentComponent} from './teacher-student/teacher-student.component';
import { GradeingComponent} from './gradeing/gradeing.component';
import { AdminsComponent} from './admins/admins.component';
import { GradeEditComponent} from './grade-edit/grade-edit.component';
import { AdminStudentComponent} from './admin-student/admin-student.component';
import { AdminStudentDetailComponent} from './admin-student-detail/admin-student-detail.component';
import { AdminParentComponent} from './admin-parent/admin-parent.component';
import { AdminParentDetailComponent} from './admin-parent-detail/admin-parent-detail.component';
import { AdminTeacherComponent} from './admin-teacher/admin-teacher.component';
import { AdminTeacherDetailComponent} from './admin-teacher-detail/admin-teacher-detail.component';
import { AdminSubjectsComponent} from './admin-subjects/admin-subjects.component';
import { AdminSubjectDetailComponent} from './admin-subject-detail/admin-subject-detail.component';
import { AdminYearComponent} from './admin-year/admin-year.component';
import { AdminYearDetailComponent} from './admin-year-detail/admin-year-detail.component';
import { AdminClassComponent} from './admin-class/admin-class.component';
import { AdminClassDetailComponent} from './admin-class-detail/admin-class-detail.component';
import { AddStudentComponent} from './add-student/add-student.component';
import { AddClassComponent} from './add-class/add-class.component';
import { AddYearSubjectComponent} from './add-year-subject/add-year-subject.component';
import { AddClassTeacherSubjectComponent} from './add-class-teacher-subject/add-class-teacher-subject.component';
import { AddClassTeacherSubjectAddComponent} from './add-class-teacher-subject-add/add-class-teacher-subject-add.component';
import { AddClassTeacherAddSubjectAddComponent} from './add-class-teacher-add-subject-add/add-class-teacher-add-subject-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  {path: 'public', component: DashboardComponent},
  {path: 'student/:id', component: StudentSubjectsComponent},
  {path: 'student', component: StudentsComponent},
  {path: 'parent', component: ParentsComponent},
  {path: 'parent/:id', component: ParentStudentComponent},
  {path: 'teacher', component: TeachersComponent},
  {path: 'teacher/:id', component: TeacherClassComponent},
  {path: 'teacher/:tId/:cId/:subId', component: TeacherStudentComponent},
  {path: 'teacher/:tId/:cId/:subId/:studId', component: GradeingComponent},
  {path: 'admin', component: AdminsComponent},
  {path: 'grade/:tId/:cId/:subId/:studId/:id', component: GradeEditComponent},
  {path: 'admin/students', component: AdminStudentComponent},
  {path: 'admin/student/:id', component: AdminStudentDetailComponent},
  {path: 'admin/student/:sId/:id', component: AddClassComponent},
  {path: 'admin/parents', component: AdminParentComponent},
  {path: 'admin/parent/:id', component: AdminParentDetailComponent},
  {path: 'admin/parent/:pId/:id', component: AddStudentComponent},
  {path: 'admin/teachers', component: AdminTeacherComponent},
  {path: 'admin/teacher/:id', component: AdminTeacherDetailComponent},
  {path: 'admin/subjects', component: AdminSubjectsComponent},
  {path: 'admin/subject/:id', component: AdminSubjectDetailComponent},
  {path: 'admin/years', component: AdminYearComponent},
  {path: 'admin/year/:id', component: AdminYearDetailComponent},
  {path: 'admin/subject/:id/year', component: AddYearSubjectComponent},
  {path: 'admin/subject/:id/class/teacher', component: AddClassTeacherSubjectComponent},
  {path: 'admin/subject/:sId/:id/class/teacher', component: AddClassTeacherSubjectAddComponent},
  {path: 'admin/subject/:sId/:cId/:id/class/teacher', component: AddClassTeacherAddSubjectAddComponent},
  {path: 'admin/class', component: AdminClassComponent},
  {path: 'admin/class/:id', component: AdminClassDetailComponent},

];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
