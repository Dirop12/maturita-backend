import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitsService { 
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.visit.create({ data }); 
  }

  findAll() {
    return this.prisma.visit.findMany();
  }

  findOne(id: number) {
    return this.prisma.visit.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.visit.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.visit.delete({ where: { id } });
  }
}
