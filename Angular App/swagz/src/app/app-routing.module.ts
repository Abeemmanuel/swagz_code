import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
{path: '', component: WelcomeComponent},
{path: 'signup', component: SignupComponent},
{path: 'login', component: LoginComponent},
{path: 'home', component: HomeComponent},
{path: 'upload', component: UploadComponent},
{path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
