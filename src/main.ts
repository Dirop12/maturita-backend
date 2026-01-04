import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path'; 
import * as express from 'express'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Nastavení Swagger dokumentace
  const config = new DocumentBuilder()
    .setTitle('Nemocniční systém')
    .setDescription('API dokumentace pro maturitní projekt')
    .setVersion('1.0')
    .addBearerAuth() // Pro budoucí JWT přihlašování
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Aplikace běží na: http://localhost:3000/api`);
}
bootstrap();