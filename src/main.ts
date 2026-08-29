import dns from 'node:dns';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter.js';

/**
 * Some local routers/DNS forwarders don't answer the SRV queries the
 * `mongodb+srv://` driver needs, even though normal A-record lookups work
 * fine (surfaces as `querySrv ECONNREFUSED`). Opt-in only, via .env, so
 * hosted environments with correct DNS are never affected.
 */
if (process.env.MONGODB_DNS_SERVERS) {
  dns.setServers(process.env.MONGODB_DNS_SERVERS.split(',').map((s) => s.trim()));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const frontendUrl = process.env.FRONTEND_URL;
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true); // curl/server-to-server, no browser Origin header
      if (frontendUrl && origin === frontendUrl) return callback(null, true);
      // Always allow any localhost port regardless of FRONTEND_URL: Next.js
      // picks a different port whenever its usual one is busy, and pinning
      // FRONTEND_URL to one exact local port breaks the moment it drifts.
      if (/^https?:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LMS API')
    .setDescription('Nền tảng quản lý học tập — CSGD / Giáo viên / Học sinh')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
