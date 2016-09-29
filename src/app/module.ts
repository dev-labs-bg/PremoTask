import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';

import { App } from './app';
import { HeaderComponent } from './header.component';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user.component';
import { HttpService } from "./http.service";
import { UsersService } from "./users.service";
import { CountryService } from "./country.service";
import { routing } from "./app.routing";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        App,
        HeaderComponent,
        DashboardComponent,
        UserComponent
    ],
    bootstrap: [ App ],
    providers: [ HttpService, UsersService, CountryService ]
})
export class AppModule { }
