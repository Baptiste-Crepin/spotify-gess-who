import { Controller, Get, Headers, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { MyGateway } from 'src/Gateway/gateway';
dotenv.config();

@ApiTags('Spotify')
@Controller('Spotify')
export class SpotifyController {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly gateway: MyGateway,
  ) {}

  @Get('TopTracks/')
  async getTopTracks(
    @Headers('authorization') token: string,
    @Query('limit') limit: number = 10,
  ): Promise<string[]> {
    const output = [];
    const topTracks = await this.spotifyService.getTopTracks(token, limit);
    topTracks.map(({ name, artists }) =>
      output.push(
        `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
      ),
    );

    //this is a test and will be deleted
    const message = {
      message: 'Spotify toptracks',
      client: 'SERVER',
      content: output,
    };
    this.gateway.server.emit('onMessage', message);

    return output;
  }

  @Get()
  async testt(){
  return 'hello world';
  } 
}
