import { Routes } from "@angular/router";

export const speakerRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/speaker-list-page/speaker-list-page.component').then(m => m.SpeakerListPageComponent),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./pages/speaker-detail-page/speaker-detail-page.component').then(m => m.SpeakerDetailPageComponent),
            }
        ]
    },
];