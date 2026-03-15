import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { UsersService } from '../../../users/service/users.service';
import { ERole } from '../../common/enums/roles.enum';
import { HashService } from '../../../shared/hash/service/hash.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const hashService = app.get(HashService);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'AdminPassword123!';

  try {
    const existingAdmin = await usersService.findOneByEmail(adminEmail);

    if (!existingAdmin) {
      const passwordHash = await hashService.hash(adminPassword);

      await usersService.create({
        username: 'admin',
        email: adminEmail,
        passwordHash,
        role: ERole.ADMIN,
      });

      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
