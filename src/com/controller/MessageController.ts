import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  OnDisconnect,
  MessageBody,
  OnMessage,
  SocketIO,
} from 'socket-controllers'
import { Socket, Server } from 'socket.io'

@SocketController()
export class MessageController {
  @OnConnect()
  connection(@SocketIO() socket: Socket) {
    console.log('client connected')
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: Socket) {
    console.log('client disconnected')
  }

  @OnMessage('message')
  save(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any,
  ) {
    console.log(message)
    io.emit('message', { result: 'ok', message })
    // socket.emit('message', message)
  }
}
