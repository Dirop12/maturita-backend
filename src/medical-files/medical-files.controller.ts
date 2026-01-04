import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MedicalFilesService } from './medical-files.service';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('medical-files')
@Controller('medical-files')
export class MedicalFilesController {
  constructor(private readonly medicalFilesService: MedicalFilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data') // Důležité pro Swagger!
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        // Vytvoří unikátní název: náhodný-kód.přípona
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Soubor nebyl nahrán');
    }

    // Uložíme info o souboru do databáze
    return this.medicalFilesService.create({
      fileName: file.originalname,
      fileUrl: `http://localhost:3000/uploads/${file.filename}`,
    });
  }

  @Get()
  findAll() {
    return this.medicalFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalFilesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalFilesService.remove(+id);
  }
}