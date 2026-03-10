import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt.auth.guard";
 
 
@Controller("/usuarios")
export class UsuarioController{
 
    constructor(private readonly usuarioService: UsuarioService){ }
 
    @UseGuards(JwtAuthGuard) // para proteger as rotas, ou seja, para que apenas usuarios autenticados possam acessar as rotas de usuario. O JwtAuthGuard é o guard que criamos para verificar se o token JWT é válido. 
    @Get('/todos')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }
 
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }
 
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }
 
    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

    //como não imlementamos o metodo que define as permissões para cada tipo de usuario, não
    //criamos o delete, senao os usuarios poderiam detetar outros usuarios.
}