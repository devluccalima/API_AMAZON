// backend/src/index.js

import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

// Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// Habilita o CORS para todas as rotas
app.use(cors());
// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// Endpoint principal da API para scraping
app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;

    // Validação: verifica se a keyword foi fornecida
    if (!keyword) {
        return res.status(400).json({ error: 'A palavra-chave (keyword) é obrigatória.' });
    }

    // Constrói a URL de busca da Amazon Brasil
    const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

    console.log(`Buscando dados para: ${keyword}`);

    try {
        const headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
        };
    
        const response = await axios.get(amazonUrl, { headers });
        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;
    
        const products = [];
    
        // SELETOR PRINCIPAL - CORRETO E CONFIRMADO
        const productElements = document.querySelectorAll('div[data-asin]');
    
        productElements.forEach(element => {
            const asin = element.getAttribute('data-asin');
            if (!asin) return; // Pula se não for um produto
    
    
            // TÍTULO:
            const titleElement = element.querySelector('h2.a-text-normal');
            
            // IMAGEM: 
            const imageElement = element.querySelector('img.s-image');
            
            // PREÇO: 
            const priceElement = element.querySelector('span.a-price');
            
            // AVALIAÇÃO: 
            const ratingElement = element.querySelector('span.a-icon-alt');
            
            // NÚMERO DE AVALIAÇÕES: 
            const reviewsElement = element.querySelector('span.a-size-base.s-underline-text');
            
            // --- EXTRAÇÃO E LIMPEZA DOS DADOS ---
            const title = titleElement ? titleElement.textContent.trim() : null;
            const imageUrl = imageElement ? imageElement.src : null;
            
            // Remove "R$" e espaços para limpar o preço
            const price = priceElement ? priceElement.textContent.trim().replace(/R\$\s?/, '') : null;
            
            const ratingText = ratingElement ? ratingElement.textContent.trim() : '';
            const rating = ratingText.includes('estrelas') ? parseFloat(ratingText.split(' ')[0].replace(',', '.')) : null;
    
            const reviewsText = reviewsElement ? reviewsElement.textContent.trim().replace(/[().]/g, '') : null; // Remove parênteses e pontos
            const reviews = reviewsText ? parseInt(reviewsText, 10) : null;
            
            if (title && imageUrl) {
                products.push({
                    title,
                    rating,
                    reviews,
                    imageUrl,
                });
            }
        });
    
        console.log(`✅ Sucesso! Total de ${products.length} produtos encontrados para "${keyword}".`);
        res.status(200).json(products);
    
    } catch (error) {
        console.error('Erro no scraping:', error.message);
        res.status(500).json({ error: 'Falha ao buscar os dados da Amazon.' });
    }
}); 

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor backend rodando em http://localhost:${PORT}`);
});