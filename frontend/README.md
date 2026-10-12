# MaisArtesão — Frontend Vue 3 + Vite

## Executar localmente

```bash
npm install
npm run dev
```

O frontend desta versão funciona em modo demonstrativo local: o login e os cadastros usam `localStorage`, sem exigir backend ou Docker para testar as telas. Os usuários cadastrados permanecem no mesmo navegador/perfil até os dados do site serem apagados.

## Contas de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin@maisartesao.com` | `Admin@123` |
| Artesão | `artesao@maisartesao.com` | `Artesao@123` |
| Cliente | `cliente@maisartesao.com` | `Cliente@123` |

A primeira abertura cria essas três contas automaticamente. A tela `/cadastro` permite criar contas de cliente e artesão; a criação de administrador fica restrita à conta demonstrativa pré-configurada.

## Importante

Esta é uma configuração para demonstração acadêmica. O `localStorage` é específico de cada navegador e pode ser editado pelo próprio usuário; as senhas são armazenadas localmente sem hash. Não use dados reais nem publique assim em produção. Para produção, a autenticação, autorização, armazenamento de senhas e usuários devem ficar no backend com banco de dados.
