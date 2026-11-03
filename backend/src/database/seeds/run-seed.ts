import { AppDataSource } from '../data-source';
import MainSeeder from './MainSeeder';

async function execute() {
  await AppDataSource.initialize();
  console.log('🌱 Conectado ao banco para rodar o seeder...');

  const seeder = new MainSeeder();
  await seeder.run(AppDataSource);

  console.log('✅ Seeders executados com sucesso!');
  await AppDataSource.destroy();
}

execute().catch((error) => {
  console.error('❌ Erro ao rodar o seeder:', error);
  process.exit(1);
});