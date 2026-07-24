# Custom GPT Integration

Use Substack Agent as a Custom GPT Action via OpenAPI.

## Steps

1. **Deploy** Substack Agent to Vercel with `API_SECRET`, `SUBSTACK_SID`, `SUBSTACK_PUB_URL`
2. Open **ChatGPT** → **Explore GPTs** → **Create**
3. In **Actions** → **Import from URL**:
   ```
   https://your-app.vercel.app/openapi.json
   ```
4. Set **Authentication** → **API Key** → **Bearer** → paste your `API_SECRET`
5. Save and test

## Example GPT instructions

```
You can publish to Substack using the publishNewsletter action.
Always confirm title and draft/live status with the user before publishing.
```

## Available actions

All operations in [OpenAPI spec](/openapi.json): publish, note, comment, automate, list, schedule.

## Next steps

- [OpenAPI guide](/docs/api/openapi)
- [Tools API overview](/docs/api/overview)
