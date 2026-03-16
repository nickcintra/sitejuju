# Backend API (.NET) – decisões de arquitetura

Documento de referência para a API administrativa do site (fotos, vídeos, design, texto Sobre).

---

## 1. Autenticação

- **JWT Bearer**: uso recomendado.
  - Login: `POST /api/auth/login` (email/senha) → retorna `{ "token": "..." }`.
  - Front salva o token (ex.: `localStorage['sitejuju-token']`) e envia no header `Authorization: Bearer <token>`.
  - API valida com `[Authorize]` e configuração JWT no pipeline.

---

## 2. Banco de dados (textos e metadados)

- **O que fica no banco**: apenas **metadados e textos** (IDs, títulos, ordens, URLs dos arquivos, conteúdo da página Sobre). Nunca binário de foto/vídeo.
- **SQL Server**: aguenta bem; em nuvem (ex.: Azure SQL) o custo costuma ser maior.
- **Opções mais baratas com boa performance**:
  - **PostgreSQL** (Railway, Render, Supabase, Neon): suporte nativo no .NET (Npgsql), planos gratuitos/baratos.
  - **SQLite**: para projeto pequeno e um único processo; zero custo de hospedagem de DB.
- **Sugestão**: PostgreSQL em provedor com free tier (ex.: Supabase ou Railway) ou SQLite se for tudo em um servidor só.

---

## 3. Fotos, vídeos e design (arquivos)

- **Não** guardar arquivo (binário) no SQL Server. Deixa o banco leve e rápido.
- **Blob storage** (arquivo fora do banco):
  - Banco guarda só **URL** (ou caminho) do arquivo.
  - Arquivo em: **Azure Blob**, **AWS S3**, **Cloudflare R2** ou **Backblaze B2** (geralmente mais barato).
- **Fluxo**:
  1. Admin faz upload na API.
  2. API grava o arquivo no blob e obtém a URL.
  3. API persiste no banco apenas a URL (e metadados: título, ordem, tipo, etc.).
- **Performance**: CDN na frente do blob (opcional) para servir fotos/vídeos mais rápido.

---

## 4. Resumo por tipo de conteúdo

| Conteúdo        | Onde guardar              | Exemplo no banco                    |
|-----------------|---------------------------|-------------------------------------|
| Texto da Sobre  | Banco (SQL/PostgreSQL)    | Tabela `Sobre` (Id, Titulo, Corpo)   |
| Fotos           | Blob + URL no banco       | Tabela `Fotos` (Id, Url, Ordem, …)   |
| Vídeos          | Blob (ou URL externa) + DB| Tabela `Videos` (Id, Url, Ordem, …) |
| Design          | Blob + URL no banco      | Tabela `Design` (Id, Url, Ordem, …) |

---

## 5. Frontend admin (Angular)

- **Mesmo projeto** do site público.
- **Rotas**: `/admin`, `/admin/login`, `/admin/fotos`, `/admin/videos`, `/admin/design`, `/admin/sobre`.
- **Guard**: rotas de conteúdo protegidas por `authGuard`; sem token válido → redireciona para `/admin/login`.
- Estrutura de pastas em `src/app/admin/` e `src/app/guards/` (ver projeto).

---

## 6. Próximos passos sugeridos (API .NET)

1. Criar solução .NET Web API (ASP.NET Core).
2. Configurar JWT Bearer (gerar e validar token).
3. Escolher banco (PostgreSQL ou SQLite) e criar tabelas (Sobre, Fotos, Videos, Design).
4. Endpoints CRUD para cada entidade (e endpoint de login).
5. Integração com um blob storage (um provedor só já resolve).
6. Angular admin: chamar a API (HttpClient), enviar token no header, implementar login e telas de listagem/edição.
