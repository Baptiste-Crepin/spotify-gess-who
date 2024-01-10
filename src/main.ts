import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redirectUri = process.env.SPOTIFY_URL_CALLBACK;
  const config = new DocumentBuilder()
    .setTitle('Spotify api')
    .setDescription('A backend-api for spotify guess who game')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `https://accounts.spotify.com/authorize?redirect_uri=${redirectUri}`,
          tokenUrl: 'https://accounts.spotify.com/api/token',
          scopes: {
            'user-top-read': 'Write access to the Spotify API',
          },
        },
      },
    })

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spotify/api', app, document);

  const corsOptions: CorsOptions = {
    origin: '*', // TODO Update with your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
}

bootstrap();
