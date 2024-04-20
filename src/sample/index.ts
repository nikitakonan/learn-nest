import { config } from 'dotenv';
import { User } from '../user/entities/user.entity';
import { Store } from '../store/entities/store.entity';
import { Location } from '../store/entities/Location';
import { Tag } from '../store/entities/tag.entity';
import { Review } from '../review/entities/review.entity';
import { DataSource } from 'typeorm';
import tags from './tags';
import users from './users';
import stores from './stores';
import reviews from './reviews';

config({ path: './.env.development.local' });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT) || 3000,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  entities: [Store, Tag, User, Review],
  synchronize: true,
});

let createdTags: Tag[] = [];
let createdUsers: User[] = [];
let createdStores: Store[] = [];
let createdReviews: Review[] = [];

function getRandom<T>(array: T[]): T {
  const rand = Math.ceil(Math.random() * (array.length - 1));
  return array[rand];
}

function parseDateString(value: string) {
  return new Date(Date.parse(value));
}

async function deleteAllData() {
  await dataSource.synchronize(true);

  console.log('all data has been deleted');
}

async function addTags() {
  createdTags = await dataSource.manager.save(
    Tag,
    tags.map((name) => ({ name })),
  );
  console.log('tags added');
}

async function addUsers() {
  createdUsers = await dataSource.manager.save(User, users);
  console.log('users added');
}

async function addStores() {
  createdStores = await dataSource.manager.save(
    Store,
    stores.map((data) => {
      const location = new Location();
      location.address = data.location.address;
      location.coordinates = `(${data.location.coordinates[0]},${data.location.coordinates[1]})`;
      return {
        slug: data.slug,
        name: data.name,
        description: data.description,
        tags: createdTags.filter((t) => data.tags.includes(t.name)),
        author: getRandom(createdUsers),
        location,
        created: parseDateString(data.created),
        // TODO resize, upload and add photo url
      };
    }),
  );
  console.log('stores added');
}

async function addReviews() {
  createdReviews = await dataSource.manager.save(
    Review,
    reviews.map((data) => {
      return {
        author: getRandom(createdUsers),
        store: getRandom(createdStores),
        text: data.text,
        rating: data.rating,
        created: parseDateString(data.created),
      };
    }),
  );
  console.log('reviews added');
}

dataSource
  .initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .then(() => deleteAllData())
  .then(() => addTags())
  .then(() => addUsers())
  .then(() => addStores())
  .then(() => addReviews())
  .then(() => dataSource.destroy())
  .then(() => console.log('Data Source has been destroyed!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );
