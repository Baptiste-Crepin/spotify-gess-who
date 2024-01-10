import { OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected ${socket.id}`);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(client: Socket, data: Message) {
    const message = {
      message: 'New message',
      client: client.id,
      content: data,
    };
    console.log(`New message: ${JSON.stringify(message)}`);
    this.server.emit('onMessage', message);
  }
}

export type Message = {
  msg: string;
};
