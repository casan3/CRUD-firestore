import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AngularFireAuth) {}
  async login(/* email: string, password: string */) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.auth.signOut();
  }
}
