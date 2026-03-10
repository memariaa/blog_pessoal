import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    // não vai ter um endpoint na Controller, pois é um método que iremos usar apenas na autenticação
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
          relations:{
            postagem: true
          }
        });
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
			relations:{
            	postagem: true
          	}
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    // esse vai mudar a linha de raciocício, pois o passport nao vai saber lidar com a senha criptografada. Então, antes de salvar o usuario, precisamos criptografar a senha. Para isso, vamos usar o Bcrypt, que é uma biblioteca de criptografia. E para isso, vamos criar um método na pasta auth/bcrypt/bcrypt.service.ts. E aqui, vamos chamar esse método para criptografar a senha antes de salvar o usuario.
    // se o usuario ja existir, ele vai devolver um bad request, usuario existente ja. para impedir que eu cadastre o usuario com mesmo email. E para isso, vamos usar o método findByUsuario, que criamos ali em cima.
    async create(usuario: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByUsuario(usuario.usuario); //busca o usuario por id para verificar se ele existe, caso contrário, lança uma exceção

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);
        //criptografar a senha antes de salvar no banco de dados
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

    //  aqui teremos alguns ajustes. Primeiro, vamos verificar se o usuario existe. Para isso, vamos usar o método findById, que criamos ali em cima. Se o usuario não existir, ele vai devolver um not found, usuario não encontrado. Depois, vamos verificar se o email do usuario que estamos tentando atualizar já existe. Para isso, vamos usar o método findByUsuario, que criamos ali em cima. Se o email já existir e for diferente do email do usuario que estamos tentando atualizar, ele vai devolver um bad request, email já cadastrado. E por fim, vamos criptografar a senha antes de salvar o usuario atualizado.
    // segunda coisa: fara busca pelo usario. fara 2 buscas para garantir queo usuario encontrado seja do mesmo id do usuario que estamos tentando atualizar. Se o email já existir e for diferente do email do usuario que estamos tentando atualizar, ele vai devolver um bad request, email já cadastrado. E por fim, vamos criptografar a senha antes de salvar o usuario atualizado.
    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id); 
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

}