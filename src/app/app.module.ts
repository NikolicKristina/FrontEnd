import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { AdminStudentDetailComponent } from './admin-student-detail/admin-student-detail.component';
import { StudentService} from './student.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService} from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';
import { ScSubjectService } from './scSubject.service';
//import { GradeDetailComponent } from './grade-detail/grade-detail.component';
import { GradeService } from './grade.service';
import { ParentService } from './parent.service';
import { ParentsComponent } from './parents/parents.component';
import { ParentSearchComponent } from './parent-search/parent-search.component';
import { ParentStudentComponent } from './parent-student/parent-student.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherService } from './teacher.service';
import { TeacherSearchComponent } from './teacher-search/teacher-search.component';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { ClassService } from './class.service';
import { TeacherStudentComponent } from './teacher-student/teacher-student.component';
import { GradeingComponent } from './gradeing/gradeing.component';
import { AdminsComponent } from './admins/admins.component';
import { AdminService } from './admin.service';
import { GradeEditComponent } from './grade-edit/grade-edit.component';
import { AdminStudentComponent } from './admin-student/admin-student.component';
import { AdminParentComponent } from './admin-parent/admin-parent.component';
import { AdminParentDetailComponent } from './admin-parent-detail/admin-parent-detail.component';
import { AdminTeacherComponent } from './admin-teacher/admin-teacher.component';
import { AdminTeacherDetailComponent } from './admin-teacher-detail/admin-teacher-detail.component';
import { AdminSubjectsComponent } from './admin-subjects/admin-subjects.component';
import { AdminSubjectDetailComponent } from './admin-subject-detail/admin-subject-detail.component';
import { AdminYearComponent } from './admin-year/admin-year.component';
import { AdminYearDetailComponent } from './admin-year-detail/admin-year-detail.component';
import { YearService } from './year.service';
import { AdminClassComponent } from './admin-class/admin-class.component';
import { AdminClassDetailComponent } from './admin-class-detail/admin-class-detail.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddYearSubjectComponent } from './add-year-subject/add-year-subject.component';
import { AddClassTeacherSubjectComponent } from './add-class-teacher-subject/add-class-teacher-subject.component';
import { AddClassTeacherSubjectAddComponent } from './add-class-teacher-subject-add/add-class-teacher-subject-add.component';
import { AddClassTeacherAddSubjectAddComponent } from './add-class-teacher-add-subject-add/add-class-teacher-add-subject-add.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AdminStudentDetailComponent,
    MessagesComponent,
    DashboardComponent,
    StudentSearchComponent,
    StudentSubjectsComponent,
    ParentsComponent,
    ParentSearchComponent,
    ParentStudentComponent,
    TeachersComponent,
    TeacherSearchComponent,
    TeacherClassComponent,
    TeacherStudentComponent,
    GradeingComponent,
    AdminsComponent,
    GradeEditComponent,
    AdminStudentComponent,
    AdminParentComponent,
    AdminParentDetailComponent,
    AdminTeacherComponent,
    AdminTeacherDetailComponent,
    AdminSubjectsComponent,
    AdminSubjectDetailComponent,
    AdminYearComponent,
    AdminYearDetailComponent,
    AdminClassComponent,
    AdminClassDetailComponent,
    AddStudentComponent,
    AddClassComponent,
    AddYearSubjectComponent,
    AddClassTeacherSubjectComponent,
    AddClassTeacherSubjectAddComponent,
    AddClassTeacherAddSubjectAddComponent
  //GradeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StudentService, MessageService, ScSubjectService, GradeService, ParentService, TeacherService, ClassService, AdminService, YearService],
  bootstrap: [AppComponent]
})
export class AppModule { }
