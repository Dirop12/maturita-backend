import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Díky tomuto ji nemusíme importovat do každého modulu zvlášť
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}