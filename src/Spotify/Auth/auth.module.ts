import { Module } from '@nestjs/common';
import { SpotifyAuthController } from './auth.controller';
import { SpotifyAuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [SpotifyAuthController],
  providers: [SpotifyAuthService],
})
export class SpotifyAuthModule {}
