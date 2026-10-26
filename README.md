# SidebarDrawer - Documentação de Personalização e Integração

## Visão Geral do Componente

O componente `SidebarDrawer` renderiza um menu lateral fixo sobre a tela, com:

- overlay para fechar ao clicar fora;
- cabeçalho com avatar e dados do usuário;
- lista de ações principais;
- seção de categorias;
- ações de rodapé como configurações, ajuda, acessibilidade e logout.

Ele foi implementado em React com Tailwind CSS e usa ícones do pacote `lucide-react` para manter o visual consistente com o tema do projeto.

A estrutura principal está concentrada em:

- `menuItems`: lista de ações do menu principal;
- `categoryItems`: lista de categorias exibidas em bloco separado;
- `handleAction`: função central para navegação e fechamento do drawer;
- `isOpen` / `onClose`: controle de visibilidade e exclusão do componente quando fechado.

## Guia de Personalização

| Tipo              | O que pode ser editado                                         | Onde localizar no arquivo                                        |
| ----------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Textos            | Títulos, labels, nomes do usuário, categorias, ações do footer | `menuItems`, `categoryItems`, blocos de texto dentro do `return` |
| Estilos           | Cores, tamanho, padding, bordas, hover, background             | classes Tailwind em cada `button`, `div`, `aside`                |
| Rotas / navegação | `onNavigate`, valores de `target`, ações para páginas/abas     | `handleAction`, `onClick={() => handleAction(...)}`              |
| Estado            | `activeTab`, `isOpen`, `onToggleNotifications`                 | props do componente e uso no `map` do menu                       |
| Layout            | largura do drawer, overlay, altura, espaçamento                | `className="w-80 max-w-[85vw] ..."`, `fixed inset-0`, `p-5`      |

### Exemplos práticos

- Para mudar o nome do usuário:
  - localizar `Nome do usuário` e alterar o texto.
- Para alterar a cor principal:
  - localizar `bg-[#E3262E]` e trocar por outra cor hexadecimal.
- Para mudar a largura do menu lateral:
  - localizar `w-80 max-w-[85vw]` e ajustar para `w-72` ou outro valor.
- Para alterar as rotas/abas:
  - localizar `handleAction("admin")`, `handleAction("categorias")`, etc.

## Mapeamento de Banco de Dados & API

O componente ainda usa dados locais e valores fixos. Para integração real com backend/banco, os dados que devem vir do servidor são:

### 1) Menu da sidebar

Dados esperados:

```json
[
  {
    "id": "home",
    "label": "Início",
    "icon": "home",
    "route": "/home"
  },
  {
    "id": "alta",
    "label": "Em alta",
    "icon": "trending-up",
    "route": "/highlights"
  }
]
```

- `id`: identificador da funcionalidade;
- `label`: texto exibido ao usuário;
- `icon`: nome do ícone, se usar sistema de ícones dinâmicos;
- `route`: caminho para navegação.

### 2) Perfil do usuário

Dados esperados:

```json
{
  "id": 1,
  "nome": "Nome do usuário",
  "cidade": "Outro",
  "estado": "SP",
  "avatarUrl": "https://.../avatar.png"
}
```

- `nome`: texto principal do cabeçalho;
- `cidade` / `estado`: podem compor a linha abaixo do nome;
- `avatarUrl`: imagem do perfil, se quiser trocar o ícone por foto real.

### 3) Categorias

Dados esperados:

```json
[
  { "id": "projetos", "nome": "Projetos de extensão" },
  { "id": "tecnologias", "nome": "Tecnologias" },
  { "id": "artigos", "nome": "Artigos" }
]
```

- `id`: usado para navegação/filtrar conteúdos;
- `nome`: texto visível na interface.

### 4) Estado de autenticação

Dados esperados:

```json
{
  "isAuthenticated": true,
  "userId": 1,
  "status": "ativo"
}
```

- `isAuthenticated`: controla se o usuário pode acessar áreas restritas;
- `userId`: identifica o perfil logado;
- `status`: talvez usada para mostrar mensagem de segurança, admin, inativo etc.

## Estrutura sugerida para tabelas / payloads

### Tabela: `sidebar_items`

```sql
CREATE TABLE sidebar_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  route VARCHAR(200) NOT NULL,
  icon VARCHAR(80),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);
```

### Tabela: `users`

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  cidade VARCHAR(80),
  estado VARCHAR(80),
  avatar_url TEXT,
  email VARCHAR(150) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: `categories`

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Payload de API sugerido

```json
{
  "user": {
    "id": 1,
    "nome": "Nome do usuário",
    "cidade": "Outro",
    "estado": "SP",
    "avatarUrl": "https://example.com/avatar.png"
  },
  "menu": [
    { "id": "home", "label": "Início", "route": "/home" },
    { "id": "notificacoes", "label": "Notificações", "route": "/notifications" }
  ],
  "categories": [{ "id": "projetos", "nome": "Projetos de extensão" }]
}
```

## Próximos Passos

### 1) Substituir dados locais por dados do backend

- Remover o array fixo `menuItems` e passar os dados vindos da API.
- Carregar o perfil do usuário com fetch/axios ou com um client do backend.
- Popular `categoryItems` com resposta do banco em vez de strings hardcoded.

### 2) Exemplo de integração com API

```jsx
useEffect(() => {
  async function fetchSidebarData() {
    const response = await fetch("/api/sidebar");
    const data = await response.json();

    // dados vindos do backend
    // data.user
    // data.menu
    // data.categories
  }

  fetchSidebarData();
}, []);
```

### 3) Conectar navegação real

No lugar de `handleAction("admin")`, você pode usar:

```jsx
router.push("/admin");
```

ou

```jsx
window.location.href = "/admin";
```

### 4) Persistir ações do usuário

Quando o usuário clicar em itens do menu, você pode enviar eventos ao backend:

```jsx
fetch("/api/user/activity", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "open_menu_item", itemId: target }),
});
```

### 5) Segurança e autenticação

- validar token JWT ou sessão antes de carregar dados do usuário;
- controlar acesso a menus com permissões;
- só renderizar itens permitidos para cada perfil.

## Conclusão

Este componente está pronto para evoluir de uma versão local estática para uma versão dinâmica conectada ao backend. Os pontos de customização e integração já foram marcados de forma explícita no código para facilitar futuras alterações e manutenção.
