import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant/constant";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
 
@Module({ // forwardRef é usado para resolver o problema de dependência circular entre os módulos 
         // AuthModule e UsuarioModule. Ele permite que ambos os módulos se importem mutuamente sem 
         // causar um erro de dependência circular.
    imports: [ forwardRef(() => UsuarioModule), 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret, 
            signOptions: {expiresIn: '1h'}
        }) // o JwtModule é usado para configurar o módulo de autenticação JWT, 
            // que é usado para gerar e validar os tokens JWT. O secret é a chave
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {};
 