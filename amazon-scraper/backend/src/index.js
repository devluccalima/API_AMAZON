import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import puppeteer from 'puppeteer';
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
        console.log('Iniciando scraper com Puppeteer...');
    
        // 1. Inicia uma instância do navegador
        // 'headless: "new"' significa que ele rodará em segundo plano, sem abrir uma janela visual
        const browser = await puppeteer.launch({ headless: "new" });
    
        // 2. Abre uma nova aba no navegador
        const page = await browser.newPage();
    
        // 3. Define um User-Agent realista (muito importante)
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
    
        // 4. Navega até a URL da Amazon
        // 'waitUntil: "domcontentloaded"' espera o HTML principal ser carregado
        console.log(`Navegando para: ${amazonUrl}`);
        await page.goto(amazonUrl, { waitUntil: 'domcontentloaded' });
    
        // 5. Extrai o conteúdo HTML final da página (depois do JS ter rodado)
        const html = await page.content();
    
        // 6. Fecha o navegador para liberar recursos (MUITO IMPORTANTE)
        await browser.close();
        console.log('Navegador fechado.');
    
        // --- A PARTIR DAQUI, O CÓDIGO É O MESMO DE ANTES ---
        // Usamos o JSDOM para analisar o HTML que o Puppeteer nos deu
        const dom = new JSDOM(html);
        const document = dom.window.document;
    
        const products = [];
        const productElements = document.querySelectorAll('div[data-asin]');
    
        productElements.forEach(element => {
            const asin = element.getAttribute('data-asin');
            if (!asin) return;
    
            const titleElement = element.querySelector('h2.a-text-normal');
            const imageElement = element.querySelector('img.s-image');
            const ratingElement = element.querySelector('span.a-icon-alt');
            const reviewsElement = element.querySelector('span.a-size-base.s-underline-text');
            
            const title = titleElement ? titleElement.textContent.trim() : null;
            const imageUrl = imageElement ? imageElement.src : null;
            const ratingText = ratingElement ? ratingElement.textContent.trim() : '';
            const rating = ratingText.includes('estrelas') ? parseFloat(ratingText.split(' ')[0].replace(',', '.')) : null;
            const reviewsText = reviewsElement ? reviewsElement.textContent.trim().replace(/[().]/g, '') : null;
            const reviews = reviewsText ? parseInt(reviewsText, 10) : null;
            
            if (title && imageUrl) {
                products.push({ title, rating, reviews, imageUrl });
            }
        });
    
        console.log(`✅ Sucesso! Total de ${products.length} produtos encontrados para "${keyword}".`);
        res.status(200).json(products);
    
    } catch (error) {
        console.error('Erro no scraping com Puppeteer:', error);
        res.status(500).json({ error: 'Falha ao buscar os dados da Amazon com Puppeteer.' });
    }

    

}); 

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor backend rodando em http://localhost:${PORT}`);
});