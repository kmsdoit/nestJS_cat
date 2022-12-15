import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'password',
  database: 'test',
  entities: ['/Users/kimmyeongsu/Desktop/잡동사니/nest_cat_pj/dist/**/*.entity.{js,ts}'],
  synchronize : false,
  logNotifications : true
}

console.log(typeORMConfig)
