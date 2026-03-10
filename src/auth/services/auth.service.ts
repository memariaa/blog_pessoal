import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
 
 
@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }
 
    // validação do usuario, para verificar se o usuario existe e se a senha está correta. 
    // Para isso, vamos usar o método findByUsuario, que criamos ali em cima, para buscar 
    // o usuario no banco de dados. Se o usuario não existir, ele vai devolver um not found, 
    // usuario não encontrado. Depois, vamos usar o método compararSenhas, que criamos na classe 
    // Bcrypt, para comparar a senha digitada com a senha do banco de dados. Se as senhas forem iguais, 
    // ele vai devolver o usuario sem a senha. Se as senhas forem diferentes, ele vai devolver null.
    async validateUser(username: string, password: string): Promise<any>{
        const buscaUsuario = await this.usuarioService.findByUsuario(username)
        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
 
        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)
        // não retorna a senha na busca do usuario, para não expor a senha do usuario. 
        // E para isso, usamos o operador rest, que é o ...resposta, para pegar todas 
        // as propriedades do usuario, menos a senha.
        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }
        return null
    }
 
    // método de login, que vai ser chamado no controller de auth, para gerar o token JWT.
    async login(usuarioLogin: UsuarioLogin){
        const payload = { sub: usuarioLogin.usuario }
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)
        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}