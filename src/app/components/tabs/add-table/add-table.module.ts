import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddTablePage } from './add-table.page';


const routes: Routes = [
  {
    path: '',
    component: AddTablePage,
  },
];

@NgModule({
  declarations: [AddTablePage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class AddTableModule {}
