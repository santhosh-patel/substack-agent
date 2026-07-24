export const MODELS = {
  groq: [
    { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B' },
    { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
  ],
  gemini: [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    { value: 'gemini-3', label: 'Gemini 3' },
  ],
  openai: [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
    { value: 'gpt-5.5-mini', label: 'GPT-5.5 Mini' },
  ],
  openrouter: [
    { value: 'openrouter/free:online', label: 'Online Search Model (Free - Web Search)' },
    { value: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash (via OpenRouter)' },
    { value: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B (via OpenRouter)' },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (via OpenRouter)' },
    { value: 'deepseek/deepseek-chat', label: 'DeepSeek Chat (via OpenRouter)' },
  ],
};
