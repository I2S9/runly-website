# Espace rédaction (`/admin`)

Back-office de rédaction des articles servis dans l'onglet actualités de
l'application mobile. Le site et l'app partagent le **même projet Supabase** :
un article publié ici apparaît dans l'app au prochain rafraîchissement, sans
nouvelle version sur les stores.

## Principe

| Rôle | Ce qu'il peut faire |
| --- | --- |
| **Média partenaire** (`is_admin = false`) | Rédiger, enregistrer un brouillon, soumettre à la relecture. Ses articles sont signés automatiquement du nom de son compte. |
| **Rédaction Runly** (`is_admin = true`) | Tout ce qui précède, plus : voir tous les articles, publier, dépublier, renvoyer avec une remarque, choisir librement la signature. |

Rien n'atteint les lecteurs sans une publication explicite par un admin. Cette
règle ne tient pas à l'interface : elle est appliquée en base par le trigger
`protect_running_news_editorial`, qui plafonne le statut d'un non-admin et
réécrit sa signature depuis son compte. Même en tapant directement dans l'API,
un partenaire ne peut ni se publier lui-même ni signer « Runly ».

## Mise en route

### 1. Migration

Dans le dépôt de l'app, exécuter dans **Supabase → SQL Editor** :

```
expo/supabase/migrations/20260814000000_news_publishers.sql
```

### 2. Variables d'environnement

Copier `.env.example` en `.env.local` (et reporter les deux variables dans
Vercel → Environment Variables) :

```
NEXT_PUBLIC_SUPABASE_URL=…
NEXT_PUBLIC_SUPABASE_ANON_KEY=…
```

Seule la clé `anon` est utilisée. La clé `service_role` contourne la RLS : elle
ne doit jamais figurer dans ce projet.

### 3. URLs de redirection Supabase

**Authentication → URL Configuration → Redirect URLs**, ajouter :

```
http://localhost:3000/auth/callback
https://www.runly-app.com/auth/callback
```

Sans ça, le lien magique renvoie vers le site mais la session n'est jamais créée.

### 4. Créer un compte rédaction

Il n'y a **pas d'inscription libre** — `shouldCreateUser: false` sur le
formulaire de connexion. Chaque accès s'ouvre à la main :

1. **Authentication → Users → Add user** : renseigner l'e-mail, cocher
   *Auto Confirm User*.
2. Copier l'UUID créé, puis dans le SQL Editor :

```sql
insert into public.news_publishers (user_id, display_name, logo_url, site_url, is_admin)
values (
  '<uuid-du-compte>',
  'Nom du média',            -- signature affichée dans l'app
  'https://…/logo.png',      -- optionnel
  'https://…',               -- optionnel
  false                      -- true pour la rédaction Runly
);
```

3. La personne se connecte sur `/admin/login` et reçoit son lien par e-mail.

Un compte authentifié absent de `news_publishers` (un utilisateur ordinaire de
l'app, par exemple) voit un message d'accès refusé, jamais le back-office.

## Circuit d'un article

```
Brouillon  ──soumettre──▶  En relecture  ──publier──▶  En ligne
    ▲                            │
    └────── renvoyer + note ─────┘
```

Un article en ligne n'est plus modifiable par son auteur : la correction passe
par la rédaction Runly, qui peut le dépublier pour le rouvrir.

## Ce que l'app sait afficher

L'application rend **du texte simple**, un paragraphe par bloc séparé d'une
ligne vide. Ni gras, ni italique, ni liens, ni images dans le corps. Faire
évoluer ça demande de toucher au rendu de `news-detail.tsx` côté app.

La couverture est optionnelle : sans image, l'app compose la carte avec le
dégradé choisi et l'une de ses quatre photos de secours.

Le champ **langue** sert au filtrage : l'app sert en priorité les articles de la
langue de l'utilisateur, et se rabat sur tout le fonds tant qu'une langue n'a
aucun article.

## Repères dans le code

| Fichier | Rôle |
| --- | --- |
| `src/proxy.ts` | Rafraîchit la session, garde `/admin`, expose `x-pathname` au layout |
| `src/lib/supabase/{client,server,env}.ts` | Clients navigateur et serveur |
| `src/lib/admin/dal.ts` | Vérification d'accès et lectures — tout passe par là |
| `src/app/admin/actions.ts` | Server Actions : enregistrer, publier, renvoyer, supprimer |
| `src/components/admin/ArticleEditor.tsx` | Éditeur, upload de couverture, aperçu de la carte |
| `src/app/auth/callback/route.ts` | Échange du code PKCE du lien magique |
