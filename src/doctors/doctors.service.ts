import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';


import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService { 
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.doctor.create({ data }); 
  }

  findAll() {
    return this.prisma.doctor.findMany();
  }

  findOne(id: number) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.doctor.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}