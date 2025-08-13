# Amazon Scraper

Este repositório contém um projeto de web scraping para a Amazon, dividido em duas partes principais: um backend para realizar o scraping e uma interface frontend para interagir com os resultados.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
amazon-scraper/
├── backend/ # Contém a lógica de scraping e a API
└── frontend/ # Contém a interface do usuário
```

## Backend

O backend é responsável por:

- Realizar o scraping de dados da Amazon.
- Expor uma API para que o frontend possa solicitar e receber os dados.

### Tecnologias Utilizadas

- **Bun**: Runtime JavaScript rápido e all-in-one.
- **Express**: Framework web para Node.js (compatível com Bun) para construir a API.
- **Puppeteer**: Biblioteca para controle de navegadores headless (como Chrome) para scraping.
- **JSDOM**: Implementação de padrões web para Node.js, útil para manipular o DOM.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições.
- **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

### Como Rodar o Backend

1.  Navegue até o diretório `backend`:

    ```bash
    cd backend
    ```

2.  **Instale as dependências:**

    Para instalar todas as dependências necessárias para o backend, utilize o gerenciador de pacotes `Bun`:

    ```bash
    bun install
    ```

    Este comando irá ler o arquivo `package.json` e baixar todos os pacotes listados em `dependencies` e `devDependencies`.

3.  Inicie o servidor de desenvolvimento:

    ```bash
    bun run dev
    ```

    O servidor estará disponível em `http://localhost:3000` (ou a porta configurada).

## Frontend

O frontend é uma aplicação web que consome a API do backend para exibir os resultados do scraping de forma amigável.

### Tecnologias Utilizadas

- **Vite**: Ferramenta de build frontend que oferece uma experiência de desenvolvimento rápida.
- **JavaScript**: Linguagem de programação principal.
- **HTML/CSS**: Para a estrutura e estilização da interface.

### Como Rodar o Frontend

1.  Navegue até o diretório `frontend`:

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    Para instalar todas as dependências necessárias para o frontend, você pode usar `Bun`, `npm` ou `yarn`:

    **Usando Bun:**
    ```bash
    bun install
    ```

    **Usando npm (Node Package Manager):**
    ```bash
    npm install
    ```

    **Usando Yarn:**
    ```bash
    yarn install
    ```

    Escolha o gerenciador de pacotes de sua preferência. Todos eles irão instalar as dependências listadas no arquivo `package.json` do frontend.

3.  Inicie o servidor de desenvolvimento:

    ```bash
    bun run dev # ou npm run dev / yarn dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou a porta configurada pelo Vite).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

[devluccalima](https://github.com/devluccalima)


