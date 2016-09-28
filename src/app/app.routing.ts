import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './user.component';

const APP_ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'user/:id', component: UserComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
