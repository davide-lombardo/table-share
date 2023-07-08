import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { TableDetailPage } from './table-detail/table-detail.page';
import { TablesTabRoutingModule } from './tables-tab-routing.module';
import { TablesTabPage } from './tables-tab.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TablesTabRoutingModule,
  ],
  declarations: [TablesTabPage, TableDetailPage],
})
export class TablesTabModule {}
