import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store/entities/store.entity';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { User } from './user/entities/user.entity';
import { Review } from './review/entities/review.entitiy';
import { Tag } from './store/entities/tag.entity';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { Session } from './session/session.entity';
import { DataSource } from 'typeorm';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    UserModule,
    StoreModule,
    ReviewModule,
    AuthModule,
    SessionModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [Store, Tag, User, Review, Session],
        synchronize: config.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: this.configService.get('SECRET'),
          name: this.configService.get('KEY'),
          resave: false,
          saveUninitialized: false,
          store: new TypeormStore({ cleanupLimit: 2, ttl: 86400 }).connect(
            this.dataSource.getRepository(Session),
          ),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
