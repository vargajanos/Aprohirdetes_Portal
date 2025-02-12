import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private api:ApiService,
    private auth:AuthService,
    private router:Router
  ){}

  user:any={
    email:"",
    password:"",
  }

  Registration(){
    if (this.user.email == "" || this.user.password == "") 
    {
        alert("Missing data")
        return;   
    }

    this.api.login(this.user).subscribe((res:any)=>{
      if (res) {
        this.auth.login(res.token);
        alert("Successful login")
        this.router.navigateByUrl("/adv")
      }
    })

  }
}
