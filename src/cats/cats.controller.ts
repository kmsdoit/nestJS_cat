import { Body, Controller, Get, Post, Req, UseFilters, UseGuards, UseInterceptors, Request} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CatsRequestDto } from "./DTO/cats.request.dto";
import { HttpExceptionFilter } from "../common/exception/http-exception.filter";
import { SuccessInterceptor } from "../common/interceptor/success.interceptor";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ResponseCatDto } from "./DTO/cat.dto";
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.request.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { CurrentUser } from "../common/decorators/user.decorator";
import { Cats } from "./cats.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService : CatsService,
              private readonly authService : AuthService) {}


  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary : '현재 고양이 정보 가져오기'})
  @Get()
  getCurrentCat(@Request() req) {
    console.log(req.user)
    return req.user
  }

  @ApiOperation({summary : '회원가입'})
  @ApiResponse({
    status: 500,
    description : 'server Error'
  })
  @ApiResponse({
    status: 200,
    description : '성공',
    type: ResponseCatDto
  })
  @Post()
  async signUp(@Body() body : CatsRequestDto) {
    console.log(body)
    return await this.catsService.signUp(body)
  }


  @ApiOperation({summary : '로그인'})
  @Post('login')
  async logIn(@Body() data : LoginRequestDto) {
    return this.authService.jwtLogin(data)
  }

  @ApiOperation({summary : '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout'
  }

  @ApiOperation({summary : '이미지 업로드'})
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg'
  }


}
