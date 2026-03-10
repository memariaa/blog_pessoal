import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioService } from "./services/usuario.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    // forwardRef é usado para resolver o problema de dependência circular entre os módulos AuthModule 
    // e UsuarioModule. Ele permite que ambos os módulos se importem mutuamente sem causar um erro de 
    // dependência circular.
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService]
    })
export class UsuarioModule{}