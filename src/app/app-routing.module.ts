import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { PlantDetailScreenComponent } from './plant-detail-screen/plant-detail-screen.component';
import { AddJournalScreenComponent } from './add-journal-screen/add-journal-screen.component';
import { AddPlantScreenComponent } from './add-plant-screen/add-plant-screen.component';
import { SearchScreenComponent } from './search-screen/search-screen.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import { EncyclopediaScreenComponent } from './encyclopedia-screen/encyclopedia-screen.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { SheetDetailScreenComponent } from './sheet-detail-screen/sheet-detail-screen.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent, canActivate: [authGuard] },
  { path: 'plant/:id', component: PlantDetailScreenComponent, canActivate: [authGuard] },
  { path: 'sheet/:id', component: SheetDetailScreenComponent, canActivate: [authGuard] },
  { path: 'add-journal/:id/:type', component: AddJournalScreenComponent, canActivate: [authGuard] },
  { path: 'edit-journal/:id', component: AddJournalScreenComponent, canActivate: [authGuard] },
  { path: 'search-plant', component: SearchScreenComponent, canActivate: [authGuard] },
  { path: 'add-plant', component: AddPlantScreenComponent, canActivate: [authGuard] },
  { path: 'edit-plant', component: AddPlantScreenComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileScreenComponent, canActivate: [authGuard] },
  { path: 'encyclopidia', component: EncyclopediaScreenComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginScreenComponent, canActivate: [loggedInGuard] },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
