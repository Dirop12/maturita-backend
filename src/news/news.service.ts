import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService { // např. UsersService
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.news.create({ data }); // TABULKA = user, patient, doctor...
  }

  findAll() {
    return this.prisma.news.findMany();
  }

  findOne(id: number) {
    return this.prisma.news.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.news.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.news.delete({ where: { id } });
  }
}
