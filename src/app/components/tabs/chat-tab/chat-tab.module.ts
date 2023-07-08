import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatTabPage } from './chat-tab.page';

import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { ChatTabRoutingModule } from './chat-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChatTabRoutingModule,
  ],
  declarations: [ChatTabPage],
})
export class ChatTabModule {}
