import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ConsultasService } from './servicio/consultas.service';
import { conteoResponse, recaudoVehiculos, sumaModelos } from './modelos/response';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vehiculos';
  fecha: any = '';
  fechaconvertida: any = '';
  conteos: { estacion: string, valor: number, }[] = [];
  valorcantidad: { estacion: string, cantidad: number, valor: number }[] = [];
  valorData: recaudoVehiculos[] = [];
  sumaModelos: sumaModelos[] = [];
  totalCantidad: number = 0;
  totalValor: number = 0;
  constructor(private datePipe: DatePipe, private servicios: ConsultasService) { }

  ngOnInit() {

    this.servicios.generarToken().subscribe(data => {
      localStorage.setItem('autorizador', data.token)
      console.log(data.token);
    })

  }

  Servicio() {
    this.valorcantidad=[];
    this.fechaconvertida = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
    const modelo = {
      fecha: this.fechaconvertida,
      token: localStorage.getItem('autorizador')
    }
    const conteoVehiculos$ = this.servicios.ConteoVehiculos(modelo);
    const recaudoVehiculos$ = this.servicios.RecaudoVehiculos(modelo);
    forkJoin([conteoVehiculos$, recaudoVehiculos$]).subscribe(([conteoResponse, recaudoResponse]) => {
      const sumaModelos: sumaModelos[] = [];
      
      for (const conteo of conteoResponse) {
        const matchingRecaudo = recaudoResponse.find((r: { estacion: any; sentido: any; hora: any; categoria: any; }) => r.estacion === conteo.estacion && r.sentido === conteo.sentido && r.hora === conteo.hora && r.categoria === conteo.categoria);

        if (matchingRecaudo) {
          sumaModelos.push({
            estacion: conteo.estacion,
            sentido: conteo.sentido,
            hora: conteo.hora,
            categoria: conteo.categoria,
            cantidad: conteo.cantidad,
            valorTabulado: matchingRecaudo.valorTabulado
          });
        }
      }

      this.conteos = [];
      const conteoMap = new Map<string, [number, number]>();
      for (const conteo of sumaModelos) {
        const key = conteo.estacion;
        const existingCount = conteoMap.get(key) || [0, 0];
        const cantidad = isNaN(conteo.cantidad) ? 0 : conteo.cantidad;
        const valor = isNaN(conteo.valorTabulado) ? 0 : conteo.valorTabulado;
        const updatedCount: [number, number] = [
          existingCount[0] + cantidad,
          existingCount[1] + valor
        ];
        conteoMap.set(key, updatedCount);
      }
      for (const [estacion, [cantidad, valor]] of conteoMap) {
        this.valorcantidad.push({ estacion, cantidad, valor });
      }
      this.totalCantidad = 0;
      this.totalValor = 0;

      for (const cantidad of this.valorcantidad) {
        this.totalCantidad += cantidad.cantidad;
        this.totalValor += cantidad.valor;
      }

    });

  }

}
