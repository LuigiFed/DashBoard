import { AbstractModel } from './abstractModel.model'

export class Flight extends AbstractModel {
  // ID!: number;
  // NUMERO_VOLO!: string;
  // COMPAGNIA_AEREA!: string;
  // DESTINAZIONE!: string;
  // CHECK_IN!: string;
  // LOGO!: string;
  // PARTENZA!: string;
  // STATUS!: string;
  // GATE: any;

id!:number;
numeroVolo!:string;
compagniaAerea!:string;
destinazione!:string;
checkIn!:string;
logo!:string;
partenza!:string;
status!:string;
gate!:string;
dataVolo!:Date;


  constructor() {
    super();
    this['class'] = 'it.swdes.test.models.Flight';
  }


}


