import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatTabPage } from './chat-tab.page';

import { ChatTabRoutingModule } from './chat-tab-routing.module';
import { OpenChatComponent } from './open-chat/open-chat.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ChatTabRoutingModule],
  declarations: [ChatTabPage, OpenChatComponent],
})
export class ChatTabModule {}
