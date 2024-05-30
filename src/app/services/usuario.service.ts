import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = `${base_url}/usuarios`;
  listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Usuario[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });
  }

  insert(usuario:Usuario){
    let token=sessionStorage.getItem('token');
    return this.http.post(`${this.url}/registerUser`,usuario,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    })
  }

  update(usuario:Usuario){
    let token=sessionStorage.getItem('token');
    return this.http.put(this.url,usuario,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    })
  }
  listId(id: number) {
    let token=sessionStorage.getItem('token');
    return this.http.get<Usuario>(`${this.url}/${id}`,
    {
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    });
  }

  delete(id:number){
    let token=sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`,{
      headers:new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
      .set('Content-Type','application/json')
    })
  }

  setList(listaNueva:Usuario[]){
    
    return this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
