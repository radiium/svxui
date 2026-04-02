# svxui — docs

Documentation site for [svxui](https://svxui.vercel.app), built with SvelteKit and [mdsvex](https://mdsvex.pika.page).

## Developing

```sh
pnpm dev
```

## Building

```sh
pnpm build
pnpm preview
```

## Structure

```
src/
├── lib/
│   ├── content/          # .svx markdown pages (components, builders, attachments, utilities)
│   └── components/       # Doc-specific UI components
└── routes/               # SvelteKit routes
```

Content pages live in `src/lib/content/` and are organized by category (`components/`, `builders/`, `attachments/`, `utilities/`) with top-level pages for introduction, getting-started, theming, styling, and colors.
