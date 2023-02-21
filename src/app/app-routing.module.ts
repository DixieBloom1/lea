import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";


import { AuthComponent } from "./auth/auth.component";
import { CityListComponent } from "./city-list/city-list.component";
import { CountryListComponent } from "./country-list/country-list.component";
import { MainComponent } from "./main/main.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'countryList', component: CountryListComponent },
  { path: 'city-list', component: CityListComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
