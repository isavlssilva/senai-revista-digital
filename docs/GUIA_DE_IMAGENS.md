# GUIA DE IMAGENS

## Objetivo

Documentar os ativos visuais do projeto e indicar onde as imagens devem ser enquadradas, armazenadas e substituídas conforme o backend e a identidade visual da revista.

## Imagens já presentes

| Página    | Elemento             | Arquivo                            | Localização         | Instrução                                                       |
| --------- | -------------------- | ---------------------------------- | ------------------- | --------------------------------------------------------------- |
| Home      | Hero principal       | URL externa em `mocks/articles.ts` | `mocks/articles.ts` | Preservar enquanto o backend não fornecer imagem definitiva     |
| Drawer    | Avatar do usuário    | `/img/avatar.svg`                  | `public/img/`       | Manter o avatar atual                                           |
| Preloader | Logo                 | `/img/favicon.ico`                 | `public/img/`       | Preservar até ajuste de identidade                              |
| Sobre     | Ilustração principal | `/img/senai.svg`                   | `public/img/`       | Manter enquanto a imagem oficial do projeto não for substituída |

## Regras de uso

- Preferir imagens com boa resolução e proporção compatível com o layout atual.
- Manter a identidade visual escura do projeto.
- Não alterar proporções de banners ou imagens sem necessidade.
- Quando backend disponibilizar imagens reais, substituir apenas os URLs e manter o layout.

## Pendências

- Confirmar imagens definitivas para notícias e capas.
- Confirmar armazenamento final (backend / CDN / bucket de mídia).
- Validar a resolução recomendada para desktop e mobile.
