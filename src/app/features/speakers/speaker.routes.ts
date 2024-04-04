import { Routes } from "@angular/router";

export const speakerRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/speaker-list-page/speaker-list-page.component').then(m => m.SpeakerListPageComponent),
    }
];