import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url='http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io'

  constructor(private http : HttpClient) { }

  authentification(email: string, password: string){
    const url = `${this.url}/auth/login`;
    const body = {email:email,password:password};
    return this.http.post<any>(url,body);
  }

  refresh(refresh_token: string){
    const url = `${this.url}/auth/refresh`;
    const body = {refresh_token:refresh_token};
    return this.http.post<any>(url,body);
  }

  getMaTeam(access_token: string){
    const url = `${this.url}/trainers/me/team`;
    let headers = new HttpHeaders({
      "Content-Type" :"application/json",
      "authorization" : `Bearer ${access_token}`
    });
    let option = {headers:headers};
    return this.http.get<number[]>(url,option);
  }

  setMaTeam(ids:number[],access_token: string): Observable<any>{
    const url = `${this.url}/trainers/me/team`;
    let headers = new HttpHeaders({
      "Content-Type" :"application/json",
      "authorization" : `Bearer ${access_token}`
    });
    let option = {headers:headers};
    return this.http.put<number[]>(url,ids,option);
  }
}
