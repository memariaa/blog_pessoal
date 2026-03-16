import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {
    @ApiProperty()
    public usuario: string 
     
    @ApiProperty()
    public senha: string
}
// a classe UsuarioLogin é usada para receber os dados de login do usuario, ou seja, o nome de usuario e a senha.