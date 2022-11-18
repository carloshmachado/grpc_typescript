import { sendUnaryData, ServerUnaryCall, ServerErrorResponse } from '@grpc/grpc-js';
import { CreateUserReply, CreateUserRequest } from '../server/proto/meuprotobuf_pb'
import { User } from '../PrismaDB/modelUser/user'

class CreateUserController {
  public async createUser(call: ServerUnaryCall<CreateUserRequest, CreateUserReply>, callback: sendUnaryData<CreateUserReply>) {
    const reply = new CreateUserReply();
    const name = call.request.getName() as string
    const age = call.request.getAge() as number

    const result = await User.createUser(name, age)

    reply.setCode(2)
    reply.setMessage(result)
    callback(null, reply)
  }
}

export default new CreateUserController()