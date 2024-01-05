import { Module } from '@nestjs/common';
import { SpotifyModule } from './Spotify/spotify.module';

@Module({
  imports: [SpotifyModule],
})
export class AppModule {}
