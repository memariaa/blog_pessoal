import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../Postagem/entities/postagem.entity"
import { Transform, TransformFnParams } from "class-transformer"
 
@Entity({name: "tb_usuarios"})
export class Usuario {
 
    @PrimaryGeneratedColumn() 
    id: number
 
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string
 
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsEmail() // precisa ser um email
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string
 
    // aqui também não tem um @Length pq a senha vai ser criptografada e seu tamnho vai aumentar quando for para o banco de dados
    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8) // a senha precisa conter no mínimo 8 caracteres
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string
 
    @Column({length: 5000 }) 
    foto: string
 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]
 
}