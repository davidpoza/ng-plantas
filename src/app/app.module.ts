import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    PlantItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
