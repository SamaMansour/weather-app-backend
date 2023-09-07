import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { bufferLogs: true,
    cors: { exposedHeaders:'x-total-count', origin: "http://192.168.1.128:3000", credentials: true}});
  await app.listen(9000);
}
bootstrap();
