import { PickType } from "@nestjs/swagger";
import { Cats } from "../../cats/cats.entity";


export class LoginRequestDto extends PickType(Cats, [
  "email",
  "password"
] as const) {}
