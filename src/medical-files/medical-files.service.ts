import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicalFilesService {
  constructor(private prisma: PrismaService) {}

  create(data: { fileName: string; fileUrl: string }) {
    return this.prisma.medicalFile.create({ data });
  }

  findAll() {
    return this.prisma.medicalFile.findMany();
  }

  async findOne(id: number) {
    const file = await this.prisma.medicalFile.findUnique({
      where: { id },
    });
    if (!file) {
      throw new NotFoundException(`Soubor s ID ${id} nebyl nalezen.`);
    }
    return file;
  }

  async remove(id: number) {
    try {
      return await this.prisma.medicalFile.delete({
        where: { id },
      });
    } catch (error) {
      // Pokud soubor neexistuje (chyba P2025), vyhodíme hezčí chybu
      throw new NotFoundException(`Nelze smazat soubor s ID ${id}, protože neexistuje.`);
    }
  }
}
