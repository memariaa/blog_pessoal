import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt.auth.guard";

@UseGuards(JwtAuthGuard) // para proteger as rotas, ou seja, para que apenas usuarios autenticados possam acessar as rotas de postagem. O JwtAuthGuard é o guard que criamos para verificar se o token JWT é válido.
@Controller("/postagens")
export class PostagemController {

    constructor(
        private readonly postagemService: PostagemService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{ //Postagem com [] pq é um array com todas as postagens
        return this.postagemService.findAll();
    }

    @Get("/:id")//: depois da barra indica que é um parâmetro, ou seja, o id da postagem que queremos buscar
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Postagem>{ //Postagem sem [] pq é apenas uma postagem
        return this.postagemService.findById(id);
    }

    @Get("/titulo/:titulo") // para o metodo não ser confundido com o findById, colocamos o titulo antes do parametro para ele saber que é um titulo e não um id
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param("titulo") titulo: string): Promise<Postagem[]>{ 
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
}