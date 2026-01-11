import { Routes } from '@angular/router';
import { LoginComponent } from '@app/auth/login/login.component';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { AlreadyLoggedCheckGuard, AuthenticationGuard } from '@app/auth/guard/authentication.guard';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { ShellComponent } from '@app/shell/shell.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ListComponent } from '@pages/users/list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [AlreadyLoggedCheckGuard],
    component: LoginComponent,
    data: { title: marker('Login') },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: marker('Logout') },
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: marker('Dashboard') },
      },
      {
        path: 'users',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ListComponent,
            data: { title: marker('Users List') },
          },
        ],
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
