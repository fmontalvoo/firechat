import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

import { Mensaje } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Array<Mensaje>;


  constructor(private afs: AngularFirestore) {
    this.chats = new Array<Mensaje>();
  }

  public cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc').limitToLast(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = mensajes;
      })
    );
  }

  public enviarMensaje(mensaje: Mensaje) {
    return this.itemsCollection.add(mensaje);
  }

}
