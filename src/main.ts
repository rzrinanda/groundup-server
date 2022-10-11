import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000, function () {
    // console.log("Express server listening on port %d", this.address().port);
    console.log("listening on port *:3000");
  });
}
bootstrap();
