import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { SpotifyAuthService } from './auth.service';
import { Response } from 'express';
dotenv.config();

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
  async handleCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.spotifyAuthService.handleCallback(code, res);
  }

  @Get('callback/success')
  getCallbackSuccess(): string {
    return 'Success';
  }

  @Get('callback/error')
  getCallbackError(): string {
    return 'Error';
  }
}
