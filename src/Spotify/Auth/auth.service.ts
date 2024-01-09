import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

@Injectable()
export class SpotifyAuthService {
  private readonly clientId = process.env.SPOTIFY_CLIENT_ID;
  private readonly redirectUri = process.env.SPOTIFY_URL_CALLBACK;
  private readonly scope = 'user-top-read';

  getAuthRedirectUrl(): string {
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${this.scope}&redirect_uri=${this.redirectUri}`;
  }

  async handleCallback(code: string): Promise<AuthData> {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authorizationString = `Basic ${Buffer.from(
      `${this.clientId}:${clientSecret}`,
    ).toString('base64')}`;

    const tokenResponse = await axios
      .post<AuthData>(
        tokenEndpoint,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authorizationString,
          },
        },
      )
      .catch((error) => {
        console.error('Error during token request:', error.response.data);
        throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
      });

    // if (tokenResponse === null) {
    //   return null;
    // }

    if (tokenResponse.status !== 200) {
      console.error('Error during token request');
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }
    console.log(tokenResponse.status);

    const tokenData: AuthData = tokenResponse.data;

    return tokenData;
  }
}

export type AuthData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};
