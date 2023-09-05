import {IsNotEmpty} from 'class-validator';

export class LoginUserDto {
   
    @IsNotEmpty() readonly username: string;

   
    @IsNotEmpty() readonly password: string;
}export class CreateUserDto {    
        
    @IsNotEmpty()
    username: string;

    @IsNotEmpty() 
    password: string;

}