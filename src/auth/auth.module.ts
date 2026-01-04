import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // <--- Importuj UsersModule
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, // <--- TADY ŘÍKÁME: "Chci používat věci z UsersModule"
    JwtModule.register({
      global: true,
      secret: 'MOJE_TAJNE_HESLO_123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}