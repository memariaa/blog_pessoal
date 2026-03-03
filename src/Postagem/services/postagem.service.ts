import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem) // indica que essa classe poder injetada em outras classes
        private postagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        // SELECT * FROM tb_postagens
        return this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem>{
        // SELECT * FROM tb_postagens WHERE id = 1
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })

        if (!postagem){
            throw new HttpException("Postagem não encontrada!", HttpStatus.NOT_FOUND);
        }
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{
        // SELECT * FROM tb_postagens WHERE titulo LIKE '%titulo%'
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // Ilike ignora maiusculas e minusculas
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        // INSERT INTO tb_postagens (titulo, texto) VALUES ('titulo', 'texto')
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{

        if(!postagem.id || postagem.id <= 0){
            throw new HttpException("O ID da postagem é inválido!", HttpStatus.BAD_REQUEST);
        }
        await this.findById(postagem.id);
        return this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);
        // DELETE FROM tb_postagens WHERE id = 1
        return this.postagemRepository.delete(id);
    }
}