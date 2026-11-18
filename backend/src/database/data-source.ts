import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  // Se houver DATABASE_URL, usa ela. Caso contrário, usa as variáveis locais do Docker
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_URL ? undefined : (process.env.DB_HOST || 'localhost'),
  port: process.env.DATABASE_URL ? undefined : (Number(process.env.DB_PORT) || 5432),
  username: process.env.DATABASE_URL ? undefined : (process.env.DB_USERNAME || 'maisartesao_user'),
  password: process.env.DATABASE_URL ? undefined : (process.env.DB_PASSWORD || 'maisartesao123'),
  database: process.env.DATABASE_URL ? undefined : (process.env.DB_NAME || process.env.DB_DATABASE || 'maisartesao'),
  // Habilita SSL automaticamente se estiver usando a URL do Render
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});