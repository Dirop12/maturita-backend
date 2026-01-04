import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DepartmentsModule } from './departments/departments.module';
import { VisitsModule } from './visits/visits.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { NewsModule } from './news/news.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MedicalFilesModule } from './medical-files/medical-files.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, PatientsModule, UsersModule, DoctorsModule, DepartmentsModule, VisitsModule, PrescriptionsModule, NewsModule, MedicalFilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
