import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../_models/user.model';
import { AuthData } from '../_models/auth-data.model';

@Injectable()
export class AuthService { 
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  public errorMessage = "";
  public successMessage = "";
  private logInErrorSubject = new Subject<string>();
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
       this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
      this.errorMessage = error.message;
    });
    
    this.successMessage = "";
    
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/home']);
  }
}
