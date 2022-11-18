import { Postgres } from "../Postgres"

export class User {
  public static async createUser(name: string, age: number): Promise<any> {
    const userapp = await Postgres.prisma.userapp.create({
      data: {
        name: name,
        age: age,
      }
    })
    return `usuario ${name} salvo com sucesso`
  }
}