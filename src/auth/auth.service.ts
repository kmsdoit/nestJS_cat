import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRepository } from "../cats/cats.repository";
import { LoginRequestDto } from "./dto/login.request.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository:CatsRepository,
              private jwtService : JwtService) {}

  async jwtLogin(data : LoginRequestDto) {
    const {email,password} = data;

    // 해당하는 이메일이 있는지 체크

    const cat = await this.catsRepository.findCatByEmail(email)

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요')
    }

    // 패스워드 일치 불일치 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password
    )

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다')
    }

    const payload =  {email : email, sub: cat.name}

    return {
      token : this.jwtService.sign(payload)
    }
  }
}
