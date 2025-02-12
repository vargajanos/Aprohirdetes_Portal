import { Component, OnInit } from '@angular/core';
import {ICON_REGISTRY_PROVIDER, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from '../../interfaces/menuitem';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{

  constructor(
    private auth:AuthService,
    private router:Router){}

  items:MenuItem[] = [];

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      this.setupMenu(res);
    });
  }

  setupMenu(isLoggedIn:boolean){
    this.items = [
      ...(isLoggedIn) ? [
        { label: "Hirdetéseim", routerLink: '/adv', icon:"home" },
        { label: "Kilépés", routerLink: '/logout', icon:"logout" }
      ] : [
        { label: "Belépés", routerLink: '/login', icon: "login"},
        { label: "Regisztráció", routerLink: '/registration', icon:"person_add"}
      ]
    ];
  }

}