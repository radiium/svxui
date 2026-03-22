# svxui-docgen

Documentation generator for the SVXUI library. Analyzes TypeScript source files and Svelte components to produce structured JSON documentation.

## Usage

```typescript
import { DocumentationGenerator } from 'svxui-docgen';

const generator = new DocumentationGenerator({
    libraryPath: './packages/svxui',
    outputPath: './docs/api.json'
});

await generator.generate();
```

## Output Structure

```typescript
interface LibraryDocumentation {
    metadata: { name: string; version?: string; sourceDirectory: string };
    components: ComponentDocumentation[];
    attachments: AttachmentDocumentation[];
    utilities: UtilityDocumentation[];
    builders: BuilderDocumentation[];
    generatedAt: string;
}
```

## Architecture

```
src/
├── core/                  # Shared abstractions
│   ├── source-file-context.ts
│   ├── directory-scanner.ts
│   ├── generics-extractor.ts
│   └── type-analysis-context.ts
├── analyzers/             # Module analyzers
│   ├── base-analyzer.ts
│   ├── component-analyzer.ts
│   ├── attachment-analyzer.ts
│   ├── builder-analyzer.ts
│   ├── utility-analyzer.ts
│   ├── props-analyzer.ts
│   └── svelte-analyzer.ts
├── extractors/
│   └── jsdoc-extractor.ts
├── builders/
│   └── documentation-builder.ts
└── utils/
```

## Scripts

```bash
pnpm run build      # Compile TypeScript
pnpm run check      # Type-check without emitting
pnpm run lint       # Run ESLint
```
