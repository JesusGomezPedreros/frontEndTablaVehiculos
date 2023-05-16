export interface conteoResponse{

    estacion: string,
    sentido: string,
    hora: number,
    categoria: string,
    cantidad: number  
}

export interface recaudoVehiculos{
    estacion: string,
    sentido: string,
    hora: number,
    categoria: string,
    valorTabulado: number  
}
export interface sumaModelos{
    estacion: string,
    sentido: string,
    hora: number,
    categoria: string,
    cantidad: number
    valorTabulado: number  
}