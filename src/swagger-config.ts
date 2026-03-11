import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Sports Challenges')
  .setDescription('API документация для платформы организации спортивных челленджей')
  .setVersion('1.0')
  .addTag('Auth', 'Методы аутентификации')
  .addTag('Users', 'Управление пользователями')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Введите JWT токен (без слова Bearer)',
    },
    'access-token'
  )
  .addCookieAuth(
    'refreshToken',
    {
      type: 'apiKey',
      in: 'cookie',
      name: 'refreshToken',
      description: 'Refresh токен в http-only cookie',
    },
    'refresh-token'
  )
  .build();
