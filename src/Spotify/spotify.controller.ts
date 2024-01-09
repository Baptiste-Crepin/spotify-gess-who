import { Controller, Get, Headers, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

@ApiTags('Spotify')
@Controller('Spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('TopTracks/')
  async connect(
    @Headers('authorization') token: string,
    // @Query('token') token: string,
    @Query('limit') limit: number = 10,
  ): Promise<string[]> {
    const output = [];
    const topTracks = await this.spotifyService.getTopTracks(token, limit);
    topTracks.map(({ name, artists }) =>
      output.push(
        `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
      ),
    );
    return output;
  }
}
