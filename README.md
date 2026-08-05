# Runly — site web

Application [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind).

## Développement

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Le back-office de rédaction (`/admin`) a besoin de variables Supabase : copier
`.env.example` en `.env.local`. Voir [ADMIN.md](./ADMIN.md).

## Scripts

- `npm run build` — build production
- `npm run start` — serveur production
- `npm run lint` — ESLint
