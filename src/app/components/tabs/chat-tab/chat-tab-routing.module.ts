import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatTabPage } from './chat-tab.page';
import { OpenChatComponent } from './open-chat/open-chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatTabPage,
  },
  {
    path: 'open-chat',
    component: OpenChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatTabRoutingModule {}
