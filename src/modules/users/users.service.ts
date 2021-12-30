import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

  private  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const { userId, username, password, role } = createUserDto;
    this.users.push({
      userId: uuidv4(),
      username,
      password,
      role
    } as User);
    return this.users;
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, username, password, role } = updateUserDto;

    this.users =  this.users.map(user =>{
      if(user.userId===id){
        user = Object.assign({},
          userId === undefined ? {'userId':user.userId} : {userId},
          username === user.username ? null : {username},
          password === undefined ? {'password':user.password} : {password},
          role === undefined ? {'role':user.role} : {role},
        ); 
      }
      return user;
    });    

    return this.users;
  }

  remove(id: string) {

    this.users = this.users.filter(user =>{
      return user.userId !== id
    });
    
    return this.users;
  }
}
