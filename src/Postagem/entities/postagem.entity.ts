import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: "tb_postagens"}) // CREATE TABLE 
export class Postagem{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) e AUTO_INCREMENT
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim()) // Remove espaço em branco no começo e no final da string
    @IsNotEmpty({ message: "É obrigatório escrever um título!" }) // (força a digitação) quando for cadastrar ou atualizar, verifica se tem algum valor
    @Length(5, 100, { message: "O título deve conter no mínimo 5 caracteres e no máximo 100 caracteres!" }) // verifica se o valor tem entre 5 e 100 caracteres
    @Column({length: 100, nullable: false}) // VARCHAR(100) e NOT NULL
    titulo: string;

    @Transform(({value}: TransformFnParams) => value?.trim()) 
    @IsNotEmpty({ message: "É obrigatório escrever o texto!" })
    @Length(10, 1000, { message: "O texto deve conter no mínimo 10 caracteres e no máximo 1000 caracteres!" })
    @Column({length: 1000, nullable: false})
    texto: string;
    
    @UpdateDateColumn() // Adiciona e atualiza a data automaticamente sem precisar que digite. Usando @CreateDateCollumn tem que inserir a data
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagem, { // Muitas postagens para um tema
        onDelete: "CASCADE" // Quando um tema for deletado, todas as postagens relacionadas a ele também serão deletadas (para n deixar postagens sem tema)
    })
    tema: Tema; // (chave estrangeira) Relacionamento com a entidade Tema, ou seja, cada postagem tem um tema
}