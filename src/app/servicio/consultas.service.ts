import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  url = 'https://localhost:7081/api/controller/ConsultaToken';
  urlConteo ='https://localhost:7081/api/controller/ConteoVehiculos';
  urlRecaudo ='https://localhost:7081/api/controller/RecaudoVehiculos';

  constructor(private http:HttpClient) { }

  generarToken():Observable<any>{
    return this.http.get(this.url);
  }
  ConteoVehiculos(fecha:any): Observable<any>{
    return this.http.post(this.urlConteo,fecha);
  }
  RecaudoVehiculos(fecha:any): Observable<any>{
    return this.http.post(this.urlRecaudo,fecha);
  }
}
