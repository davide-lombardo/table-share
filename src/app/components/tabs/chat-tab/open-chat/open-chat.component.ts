import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.scss'],
})
export class OpenChatComponent implements OnInit {

  chatMessages: ChatMessage[] = [
    { from: 'me', text: 'Hello', timestamp: new Date() },
    { from: 'you', text: 'Hi', timestamp: new Date() },
    { from: 'me', text: 'How are you?', timestamp: new Date() },
  ];

  newMessage: string = '';

  constructor() {
    this.generateRandomMessages();
  }

  ngOnInit(): void {
    
  }

  generateRandomMessages() {
    for (let i = 0; i < 10; i++) {
      const message: ChatMessage = {
        from: faker.person.firstName(),
        text: faker.lorem.sentence(),
        timestamp: faker.date.recent(),
      };
      this.chatMessages.push(message);
    }
  }

  public sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const message: ChatMessage = {
        from: 'me',
        text: this.newMessage,
        timestamp: new Date(),
      };
      this.chatMessages.push(message);
      this.newMessage = '';
    }
  }
}

interface ChatMessage {
  from: string;
  text: string;
  timestamp: Date;
}