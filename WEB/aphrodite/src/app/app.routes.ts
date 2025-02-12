import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AdvicesComponent } from './components/advices/advices.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [

    { path: "login", component: LoginComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "adv", component: AdvicesComponent, canActivate: [UserAuthGuard] },
    { path: "logout", component: LogoutComponent, canActivate: [UserAuthGuard] },
];
