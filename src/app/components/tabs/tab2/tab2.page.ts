import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
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
