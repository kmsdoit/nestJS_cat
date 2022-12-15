import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Cats extends BaseEntity {

  @PrimaryGeneratedColumn()
  id : number;

  @ApiProperty({
    example : 'kmsdoit@idb.ai',
    description : 'email',
    required : true
  })
  @Column({nullable:false, unique : true})
  @IsEmail()
  @IsNotEmpty()
  email : string

  @ApiProperty({
    example : 'kmsdoit',
    description : 'name',
    required : true
  })
  @Column({nullable : false})
  @IsString()
  @IsNotEmpty()
  name : string

  @ApiProperty({
    example : 'catpassword',
    description : 'password',
    required : true
  })
  @Column({nullable: false})
  @IsString()
  @IsNotEmpty()
  password : string

  @Column({nullable: true, default : null})
  @IsString()
  imgUrl : string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
