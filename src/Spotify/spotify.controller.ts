import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

@ApiTags('Spotify')
@Controller('Spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get()
  connect(): string {
    return 'TEST';
  }
}
