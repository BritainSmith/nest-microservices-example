import { NestFactory } from '@nestjs/core';
import { ReportsModule } from './reports.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReportsModule,
    {
      transport: Transport.TCP 
    },
  );
  await app.listen();
}
bootstrap();
