import { forwardRef, Module } from "@nestjs/common";
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cats } from "./cats.entity";
import { CatsRepository } from "./cats.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports : [TypeOrmModule.forFeature([Cats]), forwardRef(() => AuthModule)],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports : [CatsService, CatsRepository]
})
export class CatsModule {}
