import { Injectable } from '@angular/core';
import { format, isToday, isYesterday, subDays } from 'date-fns';
import { Router } from '@angular/router';
import * as ApplicationSettings from '@nativescript/core/application-settings'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private router: Router) { }

  formatDateTime(dateTime: string): string {
    const time = new Date(dateTime);
    const formattedTime = format(time, 'HH:mm');
    const yesterday = subDays(new Date(), 1);
    const yesterdayFormatted = isYesterday(time) ? 'kemarin' : formattedTime;
    const today = new Date();
    const dateFormatted = isToday(time) ? formattedTime : format(time, 'dd/MM/yyyy');
    
    if (isYesterday(time)) {
      return yesterdayFormatted;
    } else if (time < today) {
      return dateFormatted;
    } else {
      return formattedTime;
    }
  }

  setAuth(text:any){
    ApplicationSettings.setString('authenticated', text)
  }

  getAuth(){
    return ApplicationSettings.getString('authenticated')
  }

  logout(){
    ApplicationSettings.clear()
    this.router.navigate(['/login']);
  }

}
