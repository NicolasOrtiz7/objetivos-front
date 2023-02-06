import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './Components/card/card.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:"objetives", component:HomeComponent},
  {path:"**", redirectTo:"/objetives", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
