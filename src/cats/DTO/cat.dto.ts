import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Cats } from "../cats.entity";


export class ResponseCatDto extends PickType(Cats,['email','name'] as const) {
  @ApiProperty({
    example : '1',
    description : 'id',
    required : true
  })
  id : number
}
