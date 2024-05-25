import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post(`http://localhost:8080/authenticate`, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService(); //decodifica el token
    const decodedToken = helper.decodeToken(token); //contiene informacion extraida
    return decodedToken?.role; //devuelve el rol
  }
  showId() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService(); //decodifica el token
    const decodedToken = helper.decodeToken(token); //contiene informacion extraida
    return decodedToken?.id; //devuelve el id
  }
}
