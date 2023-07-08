import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';


@Component({
  selector: 'chat-tab',
  templateUrl: 'chat-tab.page.html',
  styleUrls: ['chat-tab.page.scss'],
})
export class ChatTabPage {
  message: any;

  constructor() {}

  ngOnInit() {
    this.generateMessage();
  }

  generateMessage() {
    this.message = {
      title: faker.lorem.words(),
      date: faker.date.past(),
      content: faker.lorem.paragraphs(),
    };
  }
}
