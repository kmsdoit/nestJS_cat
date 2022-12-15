import { EntityRepository, Repository } from "typeorm";
import { Cats } from "./cats.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, Injectable } from "@nestjs/common";
import { CatsRequestDto } from "./DTO/cats.request.dto";


@Injectable()
export class CatsRepository{
  constructor(@InjectRepository(Cats) private readonly catsRepository : Repository<Cats>) {}

  async findCatByEmail(email:string): Promise<Cats | null> {
    const cat = await this.catsRepository.findOne({where : {email}})
    return cat
  }

  async existByEmail(email : string): Promise<boolean> {
    try {
      const result = await this.catsRepository.exist({where : {email}})
      return result
    }catch(error) {
      throw new HttpException('db Error' , 400)
    }
  }

  async create(cat : CatsRequestDto) : Promise<Cats> {
    return await this.catsRepository.save(cat)
  }

  async findCatByIdWithoutPassword(catId : string) : Promise<Cats | null> {
    const cat = await this.catsRepository.findOneBy({name : catId})

    return cat
  }

}
