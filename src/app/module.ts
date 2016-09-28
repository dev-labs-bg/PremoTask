import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';

import { App } from './app';
import { HeaderComponent } from './header.component';
import { DashboardComponent } from './dashboard.component';
import { HttpService } from "./http.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        App,
        HeaderComponent,
        DashboardComponent
    ],
    bootstrap: [ App ],
    providers: [ HttpService ]
})
export class AppModule { }
