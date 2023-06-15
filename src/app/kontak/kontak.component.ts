import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '@nativescript/core'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-kontak',
  templateUrl: './kontak.component.html',
  styleUrls: ['./kontak.component.scss']
})
export class KontakComponent {

  searchText: string="";
  rooms:any[] = [];
  image="";

  constructor(private page:Page,private http: HttpClient,public services: ServicesService) {
    this.getData()
    this.page.actionBarHidden = true
  }

  
  getData(){
      const url = 'https://ardikastudio.site/template/users.php';
      const token = this.services.getAuth();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    
      this.http.get<any>(url, { headers }).subscribe(
        response => {
          this.rooms = response.data;
        },
        error => {
          console.error(error);
        }
      );
  }

}
