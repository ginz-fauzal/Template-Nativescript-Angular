import { Component, OnInit } from '@angular/core'
import { firebase } from '@nativescript/firebase'
import Theme from '@nativescript/theme'
import * as application from '@nativescript/core/application'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    constructor() {}
  
    ngOnInit():void {
        if (application.android) {
            try {
                Theme.setMode(Theme.Light)
            } catch (e) {}
        }
        firebase.init({
            showNotifications:true,
            showNotificationsWhenInForeground:true,
            onMessageReceivedCallback:(message) => {
            },
            onPushTokenReceivedCallback:function (token) {
            }
        }).then(
            () => {
            },
            error => {}
        )
    }
}