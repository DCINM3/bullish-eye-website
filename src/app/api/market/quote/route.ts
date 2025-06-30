import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

let browser: any = null;
let page: any = null;

const INDEX_MAP: Record<string, string> = {
  'NSEI': 'NIFTY 50',
  'NSEBANK': 'NIFTY BANK',
  'CNXIT': 'NIFTY IT',
  'NSEMDCP': 'NIFTY MIDCAP 100',
  'CRSLDX': 'NIFTY 500',
  'NSEAUTO': 'NIFTY AUTO'
};

async function initBrowser() {
  if (browser) return; // Already initialized

  try {
    console.log('Initializing browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
    
    await page.goto('https://www.nseindia.com/market-data/live-equity-market', {
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    console.log('Browser initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize browser:', error);
    if (browser) {
      await browser.close();
      browser = null;
    }
    throw new Error('Browser initialization failed');
  }
}

export async function GET(request: NextRequest) {
  try {
    await initBrowser();
    if (!page) {
      throw new Error("Puppeteer page is not available.");
    }
    
    const apiUrl = `https://www.nseindia.com/api/all-indices`;

    const nseData = await page.evaluate((url: string) => {
      return fetch(url, {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
        }
      }).then(res => {
        if (!res.ok) {
          return Promise.reject(new Error(`API request failed with status ${res.status}`));
        }
        return res.json();
      });
    }, apiUrl);
    
    const allIndices = nseData.data;
    const allowedSymbols = Object.keys(INDEX_MAP);

    const filteredIndices = allIndices.filter((index: any) => allowedSymbols.includes(index.indexSymbol));

    const transformedData = filteredIndices.map((index: any) => ({
        symbol: index.indexSymbol,
        name: index.index,
        price: index.last,
        change: index.variation,
        changePercent: index.percentChange,
        previousClose: index.previousClose,
    }));

    return NextResponse.json(transformedData);
  } catch (error: any) {
    console.error(`Error fetching indices data:`, error);
    
    if (error.message.includes('Browser initialization failed')) {
         return NextResponse.json(
            { error: 'Failed to initialize backend browser for data scraping.' },
            { status: 503 }
         );
    }

    return NextResponse.json(
      { error: `Failed to fetch market data. Reason: ${error.message}` },
      { status: 500 }
    );
  }
}

process.on('SIGTERM', async () => {
  if (browser) {
    console.log('Closing browser on SIGTERM...');
    await browser.close();
    browser = null;
  }
});
