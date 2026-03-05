import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { StartScreen } from './start-screen/start-screen';

export const routes: Routes = [
    {
        path: '',
        component: StartScreen
    },
    {
        path: 'dashboard',
        component: Dashboard
    }
];
