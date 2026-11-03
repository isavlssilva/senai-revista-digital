# MAPA DE INTEGRAÇÃO

## Objetivo

Documentar os pontos de integração que dependem do backend e do banco de dados, sem inventar contratos definitivos.

## Funcionalidades e dependências

| Funcionalidade        | Componente atual | Serviço frontend     | Endpoint esperado | Método   | Dados enviados                             | Dados recebidos              | Status   |
| --------------------- | ---------------- | -------------------- | ----------------- | -------- | ------------------------------------------ | ---------------------------- | -------- |
| Listar artigos        | home / admin     | `articleService`     | pendente          | pendente | pendente                                   | artigos, categorias, imagens | pendente |
| Criar artigo          | modal admin      | `articleService`     | pendente          | pendente | título, conteúdo, categoria, autor, imagem | artigo criado                | pendente |
| Editar artigo         | modal admin      | `articleService`     | pendente          | pendente | id + dados alterados                       | artigo atualizado            | pendente |
| Excluir artigo        | tabela admin     | `articleService`     | pendente          | pendente | id do artigo                               | confirmação                  | pendente |
| Filtrar por categoria | home             | UI local             | pendente          | pendente | categoria selecionada                      | artigos filtrados            | pendente |
| Busca por texto       | header/home      | UI local             | pendente          | pendente | termo de busca                             | resultados                   | pendente |
| Curtida               | card/artigo      | `interactionService` | pendente          | pendente | id do artigo                               | total de curtidas            | pendente |
| Salvar artigo         | card/artigo      | `interactionService` | pendente          | pendente | id do artigo + usuário                     | confirmação                  | pendente |
| Newsletter            | formulário       | `newsletterService`  | pendente          | pendente | email                                      | confirmação                  | pendente |
| Contato               | formulário       | `contactService`     | pendente          | pendente | nome, email, mensagem                      | confirmação                  | pendente |
| Perfil do usuário     | drawer           | `userService`        | pendente          | pendente | sessão atual                               | dados do usuário             | pendente |
| Autenticação          | login/admin      | `authService`        | pendente          | pendente | email/senha                                | token/sessão                 | pendente |
| Upload de imagem      | modal de artigo  | pendente             | pendente          | pendente | arquivo/imagem                             | url pública                  | pendente |

## Pendências do backend

- endpoints finais
- métodos HTTP definitivos
- JSON de entrada/saída
- autenticação
- roles e permissões
- formato de imagens
- regras de publicação
- tratamento de erros padronizado

## Observação

Os serviços e tipos criados nesta etapa são estruturas de adaptação e não substituem a modelagem final do backend ou banco.
