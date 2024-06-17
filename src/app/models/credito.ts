import { Usuario } from "./usuario";

export class credito{
    idCredito:number=0;
    interestRate:number=0;
    duration:number=1;
    dateRecorder:Date=new Date(Date.now());
    currentValue:number=0;
    remainingAmount:number=0;
    annuities:Boolean=false;
    enableCredito:Boolean=false;
    usuario:Usuario=new Usuario();
}


