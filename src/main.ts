import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  const port = process.env.PORT || 3000
  await app.listen(port, function () {
    // console.log("Express server listening on port %d", this.address().port);
    console.log(`listening on port *:${port}`);
  });
}
bootstrap();
