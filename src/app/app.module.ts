import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './seguridad/token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule
    
  ],
  providers: [
      DatePipe,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi:true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
