import * as dotenv from 'dotenv'

dotenv.config()
const { env } = process

export default {
  PORT: env.PORT,
  URL: env.URL,
  AWS_DEFAULT_REGION: env.AWS_DEFAULT_REGION

}