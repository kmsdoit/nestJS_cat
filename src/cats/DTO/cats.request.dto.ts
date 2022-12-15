import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cats } from "../cats.entity";


export class CatsRequestDto extends PickType(Cats,['email','name','password'] as const){}
