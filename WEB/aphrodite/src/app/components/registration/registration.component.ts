import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(
    private api:ApiService,
    private router:Router
  ){}

  user:any={
    name:"",
    email:"",
    address:"",
    password:"",
    confirm:""
  }

  Registration(){
    if (this.user.name == "" || this.user.email == "" || this.user.password == "" || this.user.confirm == "" || this.user.address == "") 
    {
        alert("Missing data")
        return;   
    }

    if (this.user.password != this.user.confirm) 
    {
      alert("Password doesn't match")
        return;   
    }

    this.api.registration(this.user).subscribe(res=>{
      if (res) {
       alert("Successful registration")   
        this.router.navigateByUrl("/login")
      }
    })

  }
}
