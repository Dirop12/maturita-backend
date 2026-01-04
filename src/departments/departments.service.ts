import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentsService { 
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.department.create({ data }); 
  }

  findAll() {
    return this.prisma.department.findMany();
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.department.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}

