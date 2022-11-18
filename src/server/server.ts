import { Server, ServerCredentials } from '@grpc/grpc-js';

import { MeuServiceGRPCService } from './proto/meuprotobuf_grpc_pb'
import { Postgres } from '../PrismaDB/Postgres'

import CreateUserController from '../controller/CreateUserController'
import healthCheckController from '../controller/HealthCheckController'
import config from '../config';

class ServerGrpc {
  server: Server
  adress: string

  constructor() {

    this.server = new Server()
    this.adress = `${config.URL}:${config.PORT}`
  }

  async start(): Promise<void> {
    this.server.addService(MeuServiceGRPCService, {
      createUser: CreateUserController.createUser,
      healthCheck: healthCheckController.healthCheck
    })

    this.server.bindAsync(this.adress, ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.log(
          `Erro ao iniciar servidor gRPC na porta: ${port} \n Erro: ${error}`
        );
        return;
      }

      this.server.start();
      console.log(`Servidor gRPC iniciado no endereço ${this.adress}`);
      Postgres.connect()
    })
  }
}

export default new ServerGrpc()