import { Routes } from '@angular/router';

import {TaskJournalComponent} from './pages/taskjournal/taskjournal.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        // component: TaskJournalComponent
        component: LandingComponent
    }
];