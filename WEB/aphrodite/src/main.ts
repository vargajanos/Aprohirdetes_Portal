import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
 
@NgModule({
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule { }

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
