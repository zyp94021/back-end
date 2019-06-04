import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  OnDisconnect,
  MessageBody,
  OnMessage,
  SocketIO,
  EmitOnSuccess,
} from 'socket-controllers'
import { Socket, Server } from 'socket.io'
import { MsgService } from '../service/MsgService'

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
  @OnMessage('delete')
  async delete(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() { id },
  ) {
    const result = await MsgService.delete({ id })
    io.emit('delete', result)
  }
  @OnMessage('add')
  async add(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() { message },
  ) {
    const result = await MsgService.add({ message })
    io.emit('add', result)
  }
  @OnMessage('all')
  async all(@SocketIO() io: Server, @ConnectedSocket() socket: Socket) {
    const result = await MsgService.all()
    socket.emit('all', result)
  }
}
