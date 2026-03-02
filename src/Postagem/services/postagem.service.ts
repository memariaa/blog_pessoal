import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

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
}