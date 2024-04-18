import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Tag } from './entities/tag.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Tag])],
  controllers: [StoreController],
  providers: [StoreService, PhotoService],
})
export class StoreModule {}
