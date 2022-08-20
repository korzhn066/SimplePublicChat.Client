import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {MessageDto} from "../dto/MessageDto";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public data : MessageDto[] = [];

  private hubConnection : signalR.HubConnection;

  public startConnection() : void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/MessageHub")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("connection started"))
      .catch((err) => console.log("some error" + err));
  }

  public broadcastMessage(message : MessageDto) : void {
    this.hubConnection.invoke('MessageReceived', message)
      .catch(err => console.log(err));
  }

  public addMessageListener() : void {
    this.hubConnection.on('MessageReceived', (data) =>{
      this.data.push(data)
      console.log(data);
    });
  }
}
