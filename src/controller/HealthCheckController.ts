import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { HealthCheckReply, HealthCheckRequest } from '../server/proto/meuprotobuf_pb'
class HealthCheckController {
  healthCheck(call: ServerUnaryCall<HealthCheckRequest, HealthCheckReply>, callback: sendUnaryData<HealthCheckReply>) {
    const reply = new HealthCheckReply()
    reply.setMessage(200)
    callback(null, reply)
  }
}

export default new HealthCheckController()