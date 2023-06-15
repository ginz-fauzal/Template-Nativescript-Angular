import { Component,Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router'
import { Page } from '@nativescript/core'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent{
  @Input() userInfo:any;

  userData:any=[];
  userId="";

  constructor(private page:Page,private http: HttpClient,public services: ServicesService,private aRoute: ActivatedRoute) {
    this.page.actionBarHidden = true
    this.userId= this.aRoute.snapshot.params['id']
    this.getData()
  }

  getData(){
    const token = this.services.getAuth();
    const url = 'https://ardikastudio.site/template/user.php';
    const data = {
      userId: this.userId
    };
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.post<any>(url, data, { headers }).subscribe(
      response => {
        this.userData=response.data
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}

