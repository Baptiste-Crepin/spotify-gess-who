import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthData, SpotifyAuthService } from './auth.service';

@ApiTags('Spotify/Auth')
@Controller('Spotify/Auth')
export class SpotifyAuthController {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  @Get()
  @Redirect()
  connect(): { url: string } {
    const authRedirectUrl = this.spotifyAuthService.getAuthRedirectUrl();
    return { url: authRedirectUrl };
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string): Promise<string> {
    const tokens = await this.spotifyAuthService.handleCallback(code);
    return tokens.access_token;
  }
}
