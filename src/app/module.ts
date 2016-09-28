import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { App } from './app';
import { HeaderComponent } from './header.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        App,
        HeaderComponent
    ],
    bootstrap: [ App ]
})
export class AppModule { }
