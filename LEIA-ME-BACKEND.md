# 🚀 Backend para Consulta de CPF

## Como usar:

### 1. Instalar Node.js (se ainda não tiver)
- Baixe em: https://nodejs.org/
- Instale a versão LTS (recomendada)

### 2. Instalar dependências
Abra o terminal nesta pasta e rode:
```bash
npm install
```

### 3. Iniciar o servidor
```bash
npm start
```

Ou para desenvolvimento (reinicia automaticamente):
```bash
npm run dev
```

### 4. Testar
O servidor vai rodar em `http://localhost:3000`

**Teste no navegador:**
- http://localhost:3000/health (verifica se tá rodando)
- http://localhost:3000/api/cpf/12345678909 (consulta um CPF)

### 5. Usar no seu app
O arquivo `pix-transferir.html` já vai estar configurado para usar este backend!

---

## 📝 Notas:

- **Porta padrão:** 3000 (você pode mudar no `server.js`)
- **CORS:** Já configurado para aceitar requisições do seu app
- **APIs usadas:** BrasilAPI e ReceitaWS (gratuitas)
- **Limitações:** APIs públicas podem ter rate limit

## ⚠️ Importante:

- Mantenha o servidor rodando enquanto usa o app
- CPFs inválidos ou não cadastrados retornam erro 404
- Para produção, hospede em um servidor (Heroku, Railway, Vercel, etc.)

## 🔧 Troubleshooting:

**Erro de porta em uso:**
```bash
# Mude a PORT no server.js para 3001 ou outra
```

**Erro de dependências:**
```bash
npm install --force
```

**Node não encontrado:**
- Certifique-se que instalou o Node.js
- Reinicie o terminal após instalar
