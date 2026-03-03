import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// nosso ponto de partida sempre vai ser o bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // define fuso horario
  process.env.TZ = '-03:00';

  // habilita a biblioteca validação para dar permissão para as validações
  app.useGlobalPipes(new ValidationPipe());

  //habilitar cors para ele aceitar as requisições de outras origens
  app.enableCors(/*aqui entra os endereçõs das aplicações do front, mobile e etc*/);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
