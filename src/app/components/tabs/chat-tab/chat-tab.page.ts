import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'chat-tab',
  templateUrl: 'chat-tab.page.html',
  styleUrls: ['chat-tab.page.scss'],
})
export class ChatTabPage {
  message: any;

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.generateMessage();
  }

  generateMessage() {
    this.message = {
      title: faker.lorem.words(),
      date: faker.date.past(),
      content: faker.lorem.paragraphs(),
    };
  }

  public openChat(): void {
    this.navCtrl.navigateForward(['/tabs/chat-tab/open-chat']);
  }
}
