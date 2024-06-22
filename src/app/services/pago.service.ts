import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { pago } from '../models/pago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  url = `${base_url}/pago`;
  listaCambio = new Subject<pago[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<pago[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }

  insert(pago:pago){
    let token=sessionStorage.getItem('token');
    return this.http.post(`${this.url}`,pago,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    })
  }

  delete(id:number){
    let token=sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    })
  }
  update(pago:pago){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,pago,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    })
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<pago>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:pago[]){
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
