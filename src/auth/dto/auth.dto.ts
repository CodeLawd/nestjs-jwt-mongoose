import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
