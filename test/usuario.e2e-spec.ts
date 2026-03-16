import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let app: INestApplication<App>;

  // depois de todos os testes
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../src/**/entities/*.entity.ts'], //busca no meu projeto toas pastas entities com arquivos .entity.ts
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Adiciona o ValidationPipe globalmente para validar as requisições
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("01- Deve cadastrar um novo usuário", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: "Teste",
      usuario: "teste@example.com",
      senha: '12345678',
      foto: "-"
    })
    .expect(201);

    usuarioId = resposta.body.id; // Armazena o ID do usuário criado para uso em testes posteriores
  })

  it("02- Não deve cadastrar um usuário já existente", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: "Teste",
      usuario: "teste@example.com",
      senha: '12345678',
      foto: "-"
    })
    .expect(400);
  })

  it("03- Deve autenticar um usuário cadastrado", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/logar')
    .send({
      usuario: "teste@example.com",
      senha: '12345678',
  })
    .expect(200);

    token = resposta.body.token; // Armazena o token JWT para uso em testes posteriores
  })

  it("04- Deve listar todos os usuários cadastrados", async () => {
    const resposta = await request(app.getHttpServer())
    .get('/usuarios/todos')
    .set('Authorization', `${token}`) 
    .expect(200);
  })

  it("05- Deve atualizar os dados de um usuário existente", async () => {
    const resposta = await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: "Teste atualizado",
      usuario: "teste@example.com",
      senha: '12345678',
      foto: "-"
    })
    .expect(200);
  })

  it("06- Deve buscar um usuários por id", async () => {
    const resposta = await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set('Authorization', `${token}`)
    .expect(200)

    expect(resposta.body.id).toBe(usuarioId);
  })
});
