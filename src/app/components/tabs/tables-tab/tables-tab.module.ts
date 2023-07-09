import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TableDetailPage } from './table-detail/table-detail.page';
import { TablesTabRoutingModule } from './tables-tab-routing.module';
import { TablesTabPage } from './tables-tab.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TablesTabRoutingModule,
  ],
  declarations: [TablesTabPage, TableDetailPage],
})
export class TablesTabModule {}
