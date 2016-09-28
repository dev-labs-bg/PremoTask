import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const APP_ROUTES: Routes = [
    { path: '', component: DashboardComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
