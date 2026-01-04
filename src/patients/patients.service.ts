import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {} // Tímto "připojíme" databázi

  create(data: any) {
    return this.prisma.patient.create({ data });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}