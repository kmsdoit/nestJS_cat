import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import {JwtModule} from '@nestjs/jwt'
import { JwtStrategy } from "./jwt/jwt.strategy";
import { CatsModule } from "../cats/cats.module";

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt', session : false}),
    JwtModule.register({
      secret : 'catSecret',
      signOptions : {expiresIn : '1y'},
    }),
    forwardRef(() => CatsModule)
  ],
  providers: [AuthService, JwtStrategy],
  exports : [AuthModule,AuthService]
})
export class AuthModule {}
