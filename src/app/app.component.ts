import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { HttpClient} from "@angular/common/http";
import {MessageDto} from "./dto/MessageDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public chatService: ChatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.addMessageListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/message')
      .subscribe(res => {
        console.log(res);
      })
  }

  public message : MessageDto = new MessageDto("", "");

  public SendMessage() : void {
      if (this.message.user.length == 0 || this.message.text.length == 0){
        window.alert("Both fields are required.");
        return;
      }

      this.chatService.broadcastMessage(this.message);
  }
}
