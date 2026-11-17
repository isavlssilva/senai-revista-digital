# DOCUMENTAÇÃO TÉCNICA

## Visão Geral

Este frontend foi reorganizado para manter a identidade visual atual e separar responsabilidades por domínio, sem criar backend ou banco paralelo. O objetivo principal é deixar a aplicação mais modular, legível e pronta para integração com o backend e a modelagem do banco desenvolvidos por outros grupos.

## Estrutura do Frontend

- `app/` — aplicação principal em Next.js
- `components/` — blocos visuais do sistema
- `hooks/` — lógicas reutilizáveis
- `providers/` — contexto e estado compartilhado
- `services/` — cliente HTTP e operações por domínio
- `types/` — tipos TypeScript
- `mocks/` — dados locais temporários
- `docs/` — documentação de integração e assets

## Preservação do Visual

A modularização foi realizada mantendo:

- cores, tipografia, layout e espaçamento existentes;
- animações e microinterações atuais;
- responsividade e comportamento visual;
- navegação e estados da interface.

## Dependências de Integração

As integrações abaixo dependem do grupo responsável pelo backend e banco:

- autenticação e autorização
- endpoints de artigos
- endpoints de categorias
- endpoints de usuário
- upload de imagens
- estrutura JSON de resposta
- códigos de erro padronizados
- filtros e paginação
- regras de publicação e status

## Arquivos Criados

- `types/article.ts`
- `mocks/articles.ts`
- `services/api/client.ts`
- `services/articles/article.service.ts`

## Arquivos Pendentes de Modularização

A divisão de `app/app.tsx` será feita em etapas, mantendo a aplicação funcional e compatível com a estrutura atual.

## Observação Importante

Os tipos e contratos nesta etapa são provisórios e devem ser ajustados conforme o backend final seja entregue.
