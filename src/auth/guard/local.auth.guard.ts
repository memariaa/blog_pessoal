// decorador personalizado para criar a autenticação local, ou seja, a autenticação com email e senha. 
// Para isso, vamos criar um arquivo chamado local.auth.guard.ts na pasta auth/guard. 
// E nesse arquivo, vamos criar uma classe chamada LocalAuthGuard que vai extender a classe AuthGuard 
// do passport. E nessa classe, vamos passar como parâmetro o nome da estratégia que vamos usar, 
// que é a estratégia local. E essa estratégia local vai ser criada no arquivo local.strategy.ts
// na pasta auth/strategy. E nessa estratégia local, vamos implementar a lógica de autenticação, 
// ou seja, vamos verificar se o email e a senha estão corretos. E para isso, vamos usar o serviço 
// de usuario para buscar o usuario pelo email e verificar se a senha está correta. E se estiver tudo 
// certo, ele vai devolver o usuario autenticado. E se não estiver, ele vai devolver uma exceção de 
// unauthorized.
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}