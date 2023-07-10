import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { PlantDetailScreenComponent } from './plant-detail-screen/plant-detail-screen.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent, canActivate: [authGuard] },
  { path: 'plant/:id', component: PlantDetailScreenComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginScreenComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
