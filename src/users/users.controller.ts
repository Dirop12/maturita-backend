import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users') // Zarovná Users v dokumentaci Swagger pod jednu sekci
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registrace nového uživatele - necháme veřejnou, aby se lidé mohli registrovat
  @Post()
  create(@Body() data: any) {
    return this.usersService.create(data);
  }

  // Seznam všech uživatelů - pouze pro přihlášené ADMINY
  @UseGuards(AuthGuard)
  @ApiBearerAuth() // Přidá ikonu zámku ve Swaggeru
  @Get()
  async findAll(@Request() req) {
    // Kontrola, jestli je přihlášený uživatel ADMIN
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('Tato operace je povolena pouze administrátorům.');
    }
    return this.usersService.findAll();
  }

  // Detail jednoho uživatele - vyžaduje přihlášení (jakákoliv role)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Úprava uživatele - vyžaduje přihlášení
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(+id, data);
  }

  // Smazání uživatele - pouze pro přihlášené ADMINY
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('Mazat uživatele může pouze administrátor.');
    }
    return this.usersService.remove(+id);
  }
}