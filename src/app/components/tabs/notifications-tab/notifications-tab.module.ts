import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsTabPage } from './notifications-tab.page';

import { NotificationsTabPageRoutingModule } from './notifications-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NotificationsTabPageRoutingModule,
  ],
  declarations: [NotificationsTabPage],
})
export class NotificationsTabModule {}
