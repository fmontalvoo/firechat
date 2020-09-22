import { Component, OnInit } from '@angular/core';

import { Mensaje } from 'src/app/models/mensaje.model';
import { Usuario } from 'src/app/models/usuario.model';

import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensaje: string;
  public elemento: any;
  private user: Usuario;

  constructor(public chatService: ChatService, private auth: AuthService) {
    this.user = this.auth.currentUser;
    this.chatService.cargarMensajes().subscribe(
      () => setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight, 21)
    );
  }
  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  public enviarMensaje() {
    if (this.mensaje.length > 0) {
      let mensaje: Mensaje = {
        uid: this.user.uid,
        nombre: this.user.nombre,
        mensaje: this.mensaje,
        fecha: new Date()
      };
      this.chatService.enviarMensaje(mensaje)
        .then(() => this.mensaje = "")
        .catch(error => console.log(error));
    }

  }

  public get getUser() {
    return this.user;
  }

}
