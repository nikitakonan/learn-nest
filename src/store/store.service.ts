import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PageStoresDto } from './dto/page-stores.dto';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import * as slug from 'slug';
import { Tag } from './entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
    user: User,
    photo?: string,
  ): Promise<Store> {
    const store = new Store();
    store.address = createStoreDto.address;
    store.description = createStoreDto.description;
    store.name = createStoreDto.name;
    store.photo = photo;
    store.author = user;

    // const testTags = [
    //   'Wifi',
    //   'Open Late',
    //   'Family Friendly',
    //   'Vegatarian',
    //   'Licenced',
    // ]

    const existingTags = await this.tagRepository.findBy({
      name: In(createStoreDto.tags),
    });
    store.tags = existingTags;

    const generatedSlug = slug(createStoreDto.name);
    const storesWithSlug = await this.storeRepository.findBy({
      slug: Like(`%${generatedSlug}%`),
    });
    store.slug = storesWithSlug.length
      ? `${generatedSlug}-${storesWithSlug.length + 1}`
      : generatedSlug;

    return await this.storeRepository.save(store);
  }

  async findAll(page?: number): Promise<PageStoresDto> {
    const limit = 4;
    const skip = page * limit - limit;

    const [stores, count] = await this.storeRepository.findAndCount({
      skip,
      take: limit,
      order: { created: 'desc' },
      relations: ['tags', 'author'],
    });

    const pages = Math.ceil(count / limit);

    // if (!stores.length && skip) {
    //   throw new ServerError(`No such page ${page}`, 400);
    // }
    return {
      data: stores,
      paging: {
        page,
        pages,
        count,
      },
    };
  }

  findOne(id: string): Promise<Store | null> {
    return this.storeRepository.findOneBy({ id });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  async remove(id: string): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
