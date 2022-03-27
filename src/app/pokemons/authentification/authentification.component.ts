import { Component, OnInit, Output,EventEmitter, LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  hide = true;
  email : string;
  password : string;
  message?: string;
  datastruct ?: any;
  access_token ?: string;


  constructor(private authService: AuthService, private router: Router) {
    this.email="";
    this.password="";
    this.message="";
  }

  ngOnInit(): void {
  }


  public authentification(){
    if(environment.email != this.email || environment.password != this.password){
      this.message="Compte inexistant ou mot de passe invalide";
    }
    else{
      if(this.message){
        this.message=undefined;
      }
      this.authService.authentification(this.email,this.password).subscribe(
      data => {
        localStorage.setItem("token",data.access_token as string);
        localStorage.setItem("refreshToken",data.refresh_token as string);
        this.router.navigateByUrl("/pokemon");
      }
      )
    }

  }


}
