import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local.auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
 
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }
 
    // o guard é usado para proteger a rota de login, ou seja, para verificar se o usuario existe 
    // e se a senha está correta.
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }
}