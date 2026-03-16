import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// nosso ponto de partida sempre vai ser o bootstrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Maria Eduarda Gomes","https://github.com/memariaa","mariaeduardao.gms@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // define fuso horario
  process.env.TZ = '-03:00';

  // habilita a biblioteca validação para dar permissão para as validações
  app.useGlobalPipes(new ValidationPipe());

  //habilitar cors para ele aceitar as requisições de outras origens
  app.enableCors(/*aqui entra os endereçõs das aplicações do front, mobile e etc*/);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
