import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { NativeScriptFormsModule,NativeScriptHttpClientModule,NativeScriptModule,NativeScriptCommonModule  } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomChattingComponent } from './room-chatting/room-chatting.component';
// import { ProfileComponent } from './profile/profile.component';
// import { InfoComponent } from './info/info.component';
// import { KontakComponent } from './kontak/kontak.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule, 
    NativeScriptModule, 
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RoomChattingComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthGuard
  ],
})
export class AppModule {}
