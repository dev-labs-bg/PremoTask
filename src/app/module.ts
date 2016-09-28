import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { App } from './app';
import { HeaderComponent } from './header.component';
import { DashboardComponent } from './dashboard.component';
import { HttpService } from "./http.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
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
