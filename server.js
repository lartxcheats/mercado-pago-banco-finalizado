// Backend simples para consultar CPF sem CORS
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Permite requisições do seu app
app.use(cors());
app.use(express.json());

// Rota para consultar CPF
app.get('/api/cpf/:cpf', async (req, res) => {
    const cpf = req.params.cpf.replace(/\D/g, '');
    
    console.log(`📞 Consultando CPF: ${cpf}`);
    
    // Lista de APIs para tentar
    const apis = [
        {
            name: 'BrasilAPI',
            url: `https://brasilapi.com.br/api/cpf/v1/${cpf}`,
            parse: (data) => ({
                nome: data.nome,
                cpf: data.cpf,
                nascimento: data.data_nascimento
            })
        },
        {
            name: 'ReceitaWS',
            url: `https://www.receitaws.com.br/v1/cpf/${cpf}`,
            parse: (data) => ({
                nome: data.nome,
                cpf: data.cpf,
                nascimento: data.data_nascimento
            })
        }
    ];
    
    // Tenta cada API
    for (const api of apis) {
        try {
            console.log(`  → Tentando ${api.name}...`);
            
            const response = await fetch(api.url, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const parsed = api.parse(data);
                
                if (parsed.nome && parsed.nome.length > 3) {
                    console.log(`  ✅ Sucesso! Nome: ${parsed.nome}`);
                    return res.json({
                        success: true,
                        data: parsed,
                        fonte: api.name
                    });
                }
            }
        } catch (error) {
            console.log(`  ❌ Falhou: ${error.message}`);
        }
    }
    
    // Nenhuma API funcionou
    console.log(`  ⚠️ Nenhuma API retornou dados válidos`);
    res.status(404).json({
        success: false,
        message: 'CPF não encontrado em nenhuma base de dados'
    });
});

// Rota de health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor rodando!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/api/cpf/{cpf}`);
});
