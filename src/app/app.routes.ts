import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminusuariosComponent} from './components/adminusuarios/adminusuarios.component';

const APP_ROUTES: Routes= [
    { path: 'home', component : HomeComponent},
    { path: 'adminusuarios', component : AdminusuariosComponent},
    { path: '**', pathMatch :'full', redirectTo: 'home'}
];

export const APP_ROUTING= RouterModule.forRoot(APP_ROUTES, {useHash : true});