import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { App } from './app';
import { HeaderComponent } from './header.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        App,
        HeaderComponent,
        DashboardComponent
    ],
    bootstrap: [ App ]
})
export class AppModule { }
