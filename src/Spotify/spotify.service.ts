import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  async getTopTracks(token: string, limit = 50): Promise<Track[] | null> {
    const endpoint = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}`;
    const res = await axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        if (error.response.status === HttpStatus.FORBIDDEN) {
          throw new HttpException(
            'Unauthorized token',
            HttpStatus.UNAUTHORIZED,
          );
        }
        if (error.response.status === HttpStatus.FORBIDDEN) {
          throw new HttpException(
            'Wrong scopes selected fot the authorization token',
            HttpStatus.FORBIDDEN,
          );
        }
        throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
      });

    if (res.status !== HttpStatus.OK) {
      console.error('Error during token request');
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }

    const datas = res.data.items as Track[];
    return datas;
  }
}

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: AlbumCover[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: ElementType;
  uri: string;
};

type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type ExternalIds = {
  isrc: string;
};

type ExternalUrls = {
  spotify: string;
};

type AlbumCover = {
  height: number;
  url: string;
  width: number;
};

enum ElementType {
  track = 0,
  album = 1,
}
