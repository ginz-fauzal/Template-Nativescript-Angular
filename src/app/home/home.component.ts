import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '@nativescript/core'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  searchText: string="";
  rooms:any[] = [];
  userInfo:any;

  constructor(private page:Page,private router: Router,private http: HttpClient,public services: ServicesService) {
    this.page.actionBarHidden = true
    
  }

  ngOnInit(): void {
    this.getData()
  }

  logout() {
    this.services.logout();
    this.router.navigate(['/login']);
  }

  onUserSelected(user:any){
    this.userInfo = user;
  }
  
  getData(){
      const url = 'https://ardikastudio.site/template/room.php';
      const token = this.services.getAuth();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    
      this.http.get<any>(url, { headers }).subscribe(
        response => {
          this.rooms = response.data;
          console.log(response)
        },
        error => {
          console.error(error);
        }
      );
  }

}
