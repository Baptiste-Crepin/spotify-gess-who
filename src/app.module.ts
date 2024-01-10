import { Module } from '@nestjs/common';
import { SpotifyModule } from './Spotify/spotify.module';
import { GatewayModule } from './Gateway/gateway.module';

@Module({
  imports: [SpotifyModule, GatewayModule],
})
export class AppModule {}
