import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor( 
    @InjectRepository(User)
    readonly userRepo: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const duplicateEmail= await this.userRepo.findOne({ where:{ email: createUserDto.email } });
    if(duplicateEmail){
      throw new ConflictException('Email is already in use');
    }
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const duplicateEmail=await this.userRepo.findOne({where: {email: updateUserDto.email}});
    if(duplicateEmail){
      throw new ConflictException('Email is already in use');
    }
    const user=await this.userRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user,updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    const user=await this.userRepo.findOneBy({id});
    if(!user){
      throw new NotFoundException(`User with id ${id} not found`) 
    }
    return await this.userRepo.remove(user); 
  }
}
