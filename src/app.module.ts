import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path/posix';

const entitiesPath: string = join(__dirname, '**', '*.entity.{ts,js}');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'castor.db.elephantsql.com',
      port: 5432,
      username: 'pghbjfqv',
      password: 'NOTbUGqEtG28Cjgm31pCarKEmR90LHq_',
      database: 'pghbjfqv',
      entities: [entitiesPath],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// const dbHost: string = process.env.DB_HOST;
// const dbPort: number = parseInt(process.env.DB_PORT);
// const dbUser: string = process.env.DB_USER;
// const dbPass: string = process.env.DB_PASS;
// const dbName: string = process.env.DB_NAME;
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: dbHost,
//   port: dbPort,
//   username: dbUser,
//   password: dbPass,
//   database: dbName,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: false,
//   retryDelay: 3000,
//   retryAttempts: 10,
// }),
