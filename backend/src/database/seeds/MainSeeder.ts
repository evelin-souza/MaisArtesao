import { DataSource } from 'typeorm';

export default class MainSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const usuarioRepository = dataSource.getRepository('Usuario');
    const artesaoRepository = dataSource.getRepository('Artesao');
    const categoriaRepository = dataSource.getRepository('Categoria');
    const produtoRepository = dataSource.getRepository('Produto');

    // ==========================================
    // 1. CRIAR USUÁRIOS (Admin, Artesãos e Cliente)
    // ==========================================
    let userAdmin = await usuarioRepository.findOneBy({ email: 'admin@artesao.com' });
    if (!userAdmin) {
      userAdmin = await usuarioRepository.save({
        nome: 'Administrador Geral',
        email: 'admin@artesao.com',
        senha_hash: '123', // Lembre do bcrypt na aplicação real
        telefone: '(84) 99999-0000',
        tipo_usuario: 'admin',
      });
      console.log('✅ Usuário Administrador criado!');
    }

    let userArtesao1 = await usuarioRepository.findOneBy({ email: 'anamedeiros@artesao.com' });
    if (!userArtesao1) {
      userArtesao1 = await usuarioRepository.save({
        nome: 'Ana Medeiros',
        email: 'anamedeiros@artesao.com',
        senha_hash: '123',
        telefone: '(84) 99999-1111',
        tipo_usuario: 'artesao',
      });
      console.log('✅ Usuário Artesão 1 criado!');
    }

    let userArtesao2 = await usuarioRepository.findOneBy({ email: 'joaodebarro@artesao.com' });
    if (!userArtesao2) {
      userArtesao2 = await usuarioRepository.save({
        nome: 'João de Barro',
        email: 'joaodebarro@artesao.com',
        senha_hash: '123',
        telefone: '(84) 99999-2222',
        tipo_usuario: 'artesao',
      });
      console.log('✅ Usuário Artesão 2 criado!');
    }

    let userCliente = await usuarioRepository.findOneBy({ email: 'joao@cliente.com' });
    if (!userCliente) {
      await usuarioRepository.save({
        nome: 'João da Silva',
        email: 'joao@cliente.com',
        senha_hash: '123',
        telefone: '(84) 99999-3333',
        tipo_usuario: 'cliente',
      });
      console.log('✅ Usuário Cliente criado!');
    }

    // ==========================================
    // 2. CRIAR CATEGORIAS
    // ==========================================
    const totalCategorias = await categoriaRepository.count();
    let catBordado, catCeramica;

    if (totalCategorias === 0) {
      catBordado = await categoriaRepository.save({
        nome: 'Bordados e Rendas',
        descricao: 'Peças feitas em tecido, ponto cruz e rendas tradicionais.',
      });

      catCeramica = await categoriaRepository.save({
        nome: 'Cerâmica e Barro',
        descricao: 'Utensílios e peças decorativas moldadas em argila.',
      });
      console.log('✅ Categorias criadas via Seeder!');
    } else {
      catBordado = await categoriaRepository.findOneBy({ nome: 'Bordados e Rendas' });
      catCeramica = await categoriaRepository.findOneBy({ nome: 'Cerâmica e Barro' });
    }

    // ==========================================
    // 3. CRIAR PERFIS DE ARTESÃO (Vinculados aos Usuários)
    // ==========================================
    const totalArtesaos = await artesaoRepository.count();
    let artesao1, artesao2;

    if (totalArtesaos === 0 && userArtesao1 && userArtesao2) {
      artesao1 = await artesaoRepository.save({
        usuario: userArtesao1,
        especialidade: 'Bordados em ponto cruz e rendas',
      });

      artesao2 = await artesaoRepository.save({
        usuario: userArtesao2,
        especialidade: 'Cerâmica e utensílios de argila',
      });
      console.log('✅ Perfis de Artesão vinculados aos usuários com sucesso!');
    } else {
     const todosArtesaos = await artesaoRepository.find({ relations: { usuario: true } });     artesao1 = todosArtesaos[0];
      artesao2 = todosArtesaos[1];
    }

    // ==========================================
    // 4. CRIAR PRODUTOS (Vinculados a Artesão e Categoria)
    // ==========================================
    const totalProdutos = await produtoRepository.count();
    if (totalProdutos === 0 && artesao1 && artesao2 && catBordado && catCeramica) {
      await produtoRepository.save([
        {
          nome: 'Toalha de Mesa Bordada',
          descricao: 'Toalha de mesa em linho com detalhes em ponto cruz.',
          preco: 120.00,
          artesao: artesao1,
          categoria: catBordado,
        },
        {
          nome: 'Panela de Barro Artesanal',
          descricao: 'Panela feita à mão ideal para culinária regional.',
          preco: 85.50,
          artesao: artesao2,
          categoria: catCeramica,
        },
      ]);
      console.log('✅ Produtos criados e vinculados via Seeder!');
    } else {
      console.log('ℹ️ Produtos já cadastrados ou dependências faltando.');
    }
  }
}