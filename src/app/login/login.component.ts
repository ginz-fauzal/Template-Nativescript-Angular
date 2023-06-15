import { Component,OnInit } from '@angular/core';
import { Page } from '@nativescript/core'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firebase } from '@nativescript/firebase'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  
  email: string="user1@example.com";
  password: string="password1";
  username: string="users";
  token:string='';

  constructor(private page:Page,private http: HttpClient,private router: Router,private services: ServicesService) {
    this.page.actionBarHidden = true
    if (this.services.getAuth()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    firebase.getCurrentPushToken().then((token:string) => {
      this.token=token
      console.log(this.token)
    })
  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
      token:this.token
    };

    this.http.post('https://ardikastudio.site/template/login.php', loginData).subscribe(
      (response: any) => {
        if (response.code === 200 && response.status === 'success') {
          console.log(response)
          this.services.setAuth(response.accessToken)
          this.router.navigate(['/home']);
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  register() {
    console.log(this.token)
    const loginData = {
      email: this.email,
      password: this.password,
      username:this.username
    };

    this.http.post('https://ardikastudio.site/template/register.php', loginData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
