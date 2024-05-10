import { Routes } from '@angular/router';

import {TodayComponent} from './pages/today/today.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {EntryComponent} from './pages/entry/entry.component';

export const routes: Routes = [
    {
        path: '',
        component: TodayComponent
    },
    {
        path: 'create-entry',
        component: EntryComponent
    }
];