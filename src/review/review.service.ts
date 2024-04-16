import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entitiy';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}
}
