import { Routes } from '@angular/router';

import {TaskJournalComponent} from './pages/taskjournal/taskjournal.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent }, // Ruta principal
    { path: 'taskjournal', component: TaskJournalComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];