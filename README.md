# 📦 MyProductsApp

Um sistema de gerenciamento de produtos desenvolvido com **Next.js**, onde é possível criar, visualizar, editar e excluir produtos.  
O projeto conta com autenticação, busca de produtos e uma interface responsiva e moderna.

---

## 🚀 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) – Framework React com SSR/SSG
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [TailwindCSS](https://tailwindcss.com/) – Estilização rápida e moderna
- [HeroUI](https://heroui.com/) – Componentes de UI acessíveis e elegantes
- [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) – Validação e gerenciamento de formulários
- [Zustand](https://zustand-demo.pmnd.rs/) – Gerenciamento de estado global
- [Axios](https://axios-http.com/) – Requisições HTTP
- [Lucide Icons](https://lucide.dev/) – Ícones minimalistas

---

## ⚙️ Funcionalidades

- 🔐 **Autenticação de Usuário** (login e logout)
- 🔎 **Busca de Produtos** pelo ID
- 📌 **CRUD Completo** de produtos:
  - Criar produto com imagem (thumbnail)
  - Listar produtos do usuário
  - Editar produto existente
  - Excluir produto com modal de confirmação
- 📊 **Dashboard inicial** (atalho no menu)
- 🎨 **Dark Mode** com troca de tema
- 📱 **Layout Responsivo** (mobile-first)

---

## 🔧 Como Rodar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/EsleySaab/myproductsapp.git
cd myproductsapp
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

NEXT_PUBLIC_BASE_URL="Veja o arquivo .env.example para referência"

### 4️⃣ Rodar o servidor de desenvolvimento

```bash
npm run dev
```
