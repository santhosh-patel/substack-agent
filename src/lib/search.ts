import { getGotScraping, ensureHttpClientPatched } from './substack-client.js';

/**
 * Searches the web for the given query using DuckDuckGo HTML interface.
 * Returns titles and snippets of parsed search results.
 */
export async function searchInternet(query: string): Promise<string> {
  await ensureHttpClientPatched();
  const gotScraping = getGotScraping();
  if (!gotScraping) {
    throw new Error('gotScraping HTTP client is not initialized');
  }

  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await gotScraping({
      url,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: { request: 10000 }
    });

    const html = response.body;
    const snippets: string[] = [];
    
    // Regular expression to find search result items in DuckDuckGo HTML results
    const resultReg = /<div class="result__body">([\s\S]*?)<\/div>/g;
    let match;
    let count = 0;

    while ((match = resultReg.exec(html)) !== null && count < 6) {
      const content = match[1];
      const titleMatch = /<a class="result__url"[^>]*>([\s\S]*?)<\/a>/.exec(content);
      const snippetMatch = /<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/.exec(content);
      
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '';
      const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').trim() : '';
      
      if (title || snippet) {
        snippets.push(`- Title: ${title}\n  Snippet: ${snippet}`);
        count++;
      }
    }

    if (snippets.length === 0) {
      // Fallback search result parser
      const fallbackSnippetReg = /<td class="result-snippet">([\s\S]*?)<\/td>/g;
      let fMatch;
      while ((fMatch = fallbackSnippetReg.exec(html)) !== null && count < 6) {
        const snippet = fMatch[1].replace(/<[^>]*>/g, '').trim();
        if (snippet) {
          snippets.push(`- Snippet: ${snippet}`);
          count++;
        }
      }
    }

    if (snippets.length === 0) {
      return "No detailed web search results could be retrieved from DuckDuckGo. Using general AI knowledge instead.";
    }

    return snippets.join('\n\n');
  } catch (err: any) {
    console.error('[Search] DuckDuckGo search error:', err.message);
    return `DuckDuckGo web search was unavailable: ${err.message}. Using general AI knowledge instead.`;
  }
}
