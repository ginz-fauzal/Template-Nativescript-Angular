import { Component, OnInit,ElementRef, NgZone,ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router'
import { messaging } from '@nativescript/firebase/messaging'
import { Page } from '@nativescript/core'

@Component({
  selector: 'app-room-chatting',
  templateUrl: './room-chatting.component.html',
  styleUrls: ['./room-chatting.component.scss']
})
export class RoomChattingComponent implements OnInit {

  @ViewChild('terminalScroller', { read: ElementRef, static: false }) terminalScroller: ElementRef
  chatText: string = '';
  roomId: number =0;
  roomImage:string='';
  scrollableHeight:any
  chatData: any[] = [];
  hiddenkirim=false;

  constructor(private page:Page,private http: HttpClient,private zone: NgZone,private aRoute: ActivatedRoute,public services: ServicesService) { 
    this.roomId= this.aRoute.snapshot.params['id']
    this.page.actionBarHidden = true
    this.fetchChatData()
  }

  ngOnInit(): void {
    messaging.registerForPushNotifications({
        onPushTokenReceivedCallback: (token: string): void => {
          console.log('Firebase plugin received a push token: ' + token)
        },
        onMessageReceivedCallback: (message) => {
          console.log('Push message received: ' + message.title )
          this.zone.run(()=>this.fetchChatData())
        },
        showNotifications: true,
        showNotificationsWhenInForeground: true
      }).then(() => console.log('Registered for push'))
}

  sendMessage() {
    if(this.chatText!='\n'){
      this.hiddenkirim=true
      const token = this.services.getAuth();
      const url = 'https://ardikastudio.site/template/chatsend.php';
      const data = {
        roomId: this.roomId,
        message: this.chatText
      };
      
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      this.http.post(url, data, { headers }).subscribe(
        response => {
          this.hiddenkirim=false
          this.fetchChatData();
          this.chatText="";
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
    }else{
      this.chatText=''
    }
  }

  fetchChatData() {
    const token = this.services.getAuth();
    const url = `https://ardikastudio.site/template/chat.php?roomId=${this.roomId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(url, { headers }).subscribe(
      response => {
        this.chatData = response.data;
        console.log(this.chatData)
        setTimeout(() => {
          this.scrollableHeight = this.terminalScroller.nativeElement.scrollableHeight
          this.terminalScroller.nativeElement.scrollToVerticalOffset(this.terminalScroller.nativeElement.scrollableHeight, false)
      }, 500)
      },
      error => {
        console.error(error);
      }
    );
  }
}
