import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vehiculos';
  fecha: any = '';
  fechaconvertida: any = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(){
    
  }

  Servicio() {
    this.fechaconvertida = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
    
    console.log (this.fechaconvertida);
  } 


}
