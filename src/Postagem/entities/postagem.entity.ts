import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "tb_postagens"}) // CREATE TABLE 
export class Postagem{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) e AUTO_INCREMENT
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim()) // Remove espaço em branco no começo e no final da string
    @IsNotEmpty() // (força a digitação) quando for cadastrar ou atualizar, verifica se tem algum valor
    @Column({length: 100, nullable: false}) // VARCHAR(100) e NOT NULL
    titulo: string;

    @Transform(({value}: TransformFnParams) => value?.trim()) 
    @IsNotEmpty() 
    @Column({length: 1000, nullable: false})
    texto: string;
    
    @UpdateDateColumn() // Adiciona e atualiza a data automaticamente sem precisar que digite. Usando @CreateDateCollumn tem que inserir a data
    data: Date;
}