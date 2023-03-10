import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRequestDto } from "./DTO/cats.request.dto";
import { InjectRepository } from "@nestjs/typeorm";

import * as bcrypt from 'bcrypt'
import { Cats } from "./cats.entity";
import { Repository } from "typeorm";
import { CatsRepository } from "./cats.repository";

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository : CatsRepository) {}

  async signUp(body: CatsRequestDto) {

    const {email, name, password} = body;
    const isCatExist = await this.catsRepository.existByEmail(email)

    if (isCatExist){
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    })

    return cat
  }


}
