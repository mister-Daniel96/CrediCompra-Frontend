import { credito } from "./credito";
import { Usuario } from "./usuario";

export class pago{
    idPago:number=0;
    amountPago:number=0;
    dateRecorded:Date=new Date(Date.now());
    dateExpiration:Date=new Date(Date.now());
    enablePago:Boolean=true;
    credito:credito=new credito();
}


