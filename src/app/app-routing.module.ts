import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './lib/guards/auth.guard';
import { IndexComponent, ContractComponent, CategComponent, CreatorComponent, SubCategComponent, UsersComponent } from './routes';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'contract',
    component: ContractComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'creator', 'client'] }
  },
  {
    path: 'categ',
    component: CategComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'categ/subcateg',
        component: SubCategComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }

  },
  {
    path: 'creator',
    component: CreatorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'creator'] }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
