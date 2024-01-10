import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { SpotifyAuthModule } from './Auth/auth.module';
import { MyGateway } from 'src/Gateway/gateway';

@Module({
  imports: [SpotifyAuthModule, MyGateway],
  controllers: [SpotifyController],
  providers: [SpotifyService, MyGateway],
})
export class SpotifyModule {}
