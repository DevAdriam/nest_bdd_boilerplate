import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envSchema } from './env.config';

const logger = new Logger('ConfigModule');
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        logger.log('validating env variables...');
        const parsedSchema = envSchema.safeParse(config);
        if (!parsedSchema.success) {
          logger.error(parsedSchema.error);
          throw new Error(
            'Invalid environment configuration. Check environment variables.',
          );
        }
        logger.log('env variables successfully validated');
        return parsedSchema.data;
      },
    }),
  ],
})
export class ConfigModule {}
