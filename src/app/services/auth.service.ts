import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: Usuario;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (!user) return;
      this.usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email
      };
    });
  }

  public login(): void {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.usuario = null;
    this.auth.signOut();
  }

  public get currentUser() {
    return this.usuario;
  }
}
