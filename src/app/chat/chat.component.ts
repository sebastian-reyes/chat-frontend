import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private client: Client;
  conectado: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:9898/chat-websocket");
    };
    this.client.onConnect = (frame) => {
      console.log('Contectados: ' + this.client.connected + ':' + frame);
      this.conectado = true;
    }
    this.client.onDisconnect = (frame) => {
      console.log('Descontectados: ' + !this.client.connected + ':' + frame)
      this.conectado = false;
    };
  }
  conectar(): void {
    this.client.activate();

  }
  desconectar(): void {
    this.client.deactivate();
  }
}
