import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  url = 'https://localhost:7081/api/controller/ConsultaToken';

  constructor(private http:HttpClient) { }

  generarToken():Observable<any>{
    return this.http.get(this.url);
  }
  ConteoVehiculos(fecha:string)
}
