import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findById(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }

  async create(data: any) {
    const newUser = this.usersRepository.create(data);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, data: any) {
    const user = await this.usersRepository.findOne(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }
}
