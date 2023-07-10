import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SearchScreenComponent } from './search-screen/search-screen.component';
import { AddJournalScreenComponent } from './add-journal-screen/add-journal-screen.component';
import { PlantScreenComponent } from './plant-screen/plant-screen.component';
import { EditPlantScreenComponent } from './edit-plant-screen/edit-plant-screen.component';
import { HeaderComponent } from './header/header.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantItemComponent } from './plant-item/plant-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { AuthService } from './services/auth.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MaterialModule } from './material/material.module';
import { PlantsService } from './services/plants.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { PlantsSheetsService } from './services/plants-sheets.service';
import { PlantDetailScreenComponent } from './plant-detail-screen/plant-detail-screen.component';
import { ActionButtonsComponent } from './plant-detail-screen/action-buttons/action-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    SearchScreenComponent,
    AddJournalScreenComponent,
    PlantScreenComponent,
    EditPlantScreenComponent,
    HeaderComponent,
    PlantListComponent,
    PlantItemComponent,
    LoginScreenComponent,
    ForbiddenComponent,
    PlantDetailScreenComponent,
    ActionButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    PlantsService,
    PlantsSheetsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
