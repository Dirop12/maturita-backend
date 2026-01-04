import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService { 
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.prescription.create({ data }); 
  }

  findAll() {
    return this.prisma.prescription.findMany();
  }

  findOne(id: number) {
    return this.prisma.prescription.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.prescription.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.prescription.delete({ where: { id } });
  }
}