import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../Postagem/entities/postagem.entity";

@Entity({ name: "tb_temas"})
export class Tema{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim()) 
    @IsNotEmpty({ message: "É obrigatório escrever uma descrição!" })
    @Length(5, 255, { message: "A descrição deve conter no mínimo 5 caracteres e no máximo 255 caracteres!" }) 
    @Column({length: 255, nullable: false})
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema) // Um tema para muitas postagens
    postagem: Postagem[]; // Array de retorno, pega todas as postagens associadas a este tema para visualização.
}