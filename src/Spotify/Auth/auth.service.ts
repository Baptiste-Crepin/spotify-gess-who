import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

@Injectable()
export class SpotifyAuthService {
  private readonly client_id = process.env.SPOTIFY_CLIENT_ID;
  private readonly redirect_uri = process.env.SPOTIFY_URL_CALLBACK;
  private readonly scope = 'user-read-private user-read-email';

  getAuthRedirectUrl(): string {
    return (
      'https://accounts.spotify.com/authorize?' +
      `response_type=code&` +
      `client_id=${this.client_id}&` +
      `scope=${this.scope}&` +
      `redirect_uri=${this.redirect_uri}&`
    );
  }

  async handleCallback(code: string, res: Response): Promise<void> {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = this.redirect_uri;

    const tokenResponse = await axios.post<AuthData>(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`,
          ).toString('base64')}`,
        },
      },
    );

    if (tokenResponse.status !== 200) return res.redirect('/error');

    const tokenData = tokenResponse.data;
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    return res.redirect('callback/success');
  }
}

type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};
