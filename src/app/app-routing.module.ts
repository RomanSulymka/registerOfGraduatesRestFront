import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GraduatedComponent } from './graduated/graduated.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { RegisterComponent } from './register/register.component';
import { WorkComponent } from './work/work.component';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserPageComponent},
  {path: 'graduated', component: GraduatedComponent},
  {path: 'logout', component: LoginComponent},
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'work', component: WorkComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'chart', component: ChartPageComponent},
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
