import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Punto de entrada de la API. Levanta Nest, activa CORS (para que el
// front en React Native / Expo pueda llamarla desde otro origen) y
// valida automáticamente todo DTO marcado con class-validator.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`FinanceTracker API escuchando en http://localhost:${port}`);
}
bootstrap();
