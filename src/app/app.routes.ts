import { Routes } from '@angular/router';
import { speakerRoutes } from './features/speakers/speaker.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'speakers',
        pathMatch: 'full'
    },
    {
        path: 'speakers',
        children: speakerRoutes
    }
];
