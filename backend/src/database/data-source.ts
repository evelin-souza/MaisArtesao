import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do seu arquivo .env

export const AppDataSource = new DataSource({
  type: 'postgres', // Ajuste para 'postgres' se estiver usando PostgreSQL
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'interrotas',
  // Aponta onde estão suas Entities (ajuste o caminho conforme seu projeto)
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // Aponta onde ficarão os arquivos de migration que criaremos
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // DEVE ser false quando usamos migrations
});