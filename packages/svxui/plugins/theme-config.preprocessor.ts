// lib/preprocessor/colorPreprocessor.js
import path from 'node:path';
import fs from 'node:fs';

/**
 * Préprocesseur Svelte pour gérer les couleurs des composants
 * @param {Object} options - Options du préprocesseur
 * @param {Object} options.colorAliases - Mappages des alias de couleurs vers les couleurs Radix
 * @param {string} options.colorFilesPath - Chemin vers les fichiers CSS de couleurs
 * @returns {Object} - Preprocessor Svelte
 */
export function createColorPreprocessor(options = {}) {
    // Valeurs par défaut
    const defaultColorAliases = {
        neutral: 'neutral',
        blue: 'blue',
        green: 'grass',
        yellow: 'amber',
        orange: 'orange',
        red: 'tomato'
    };

    // Fusionner les options avec les valeurs par défaut
    const colorAliases = { ...defaultColorAliases, ...(options.colorAliases || {}) };
    const colorFilesPath = options.colorFilesPath || path.resolve(__dirname, '../styles/colors');

    // Générer un fichier TypeScript avec les définitions de types
    generateColorTypeDefinitions(colorAliases);

    // Générer un fichier CSS qui importe tous les fichiers de couleurs utilisés
    generateColorStyleImports(colorAliases, colorFilesPath);

    return {
        // Traiter le markup Svelte
        markup({ content, filename }) {
            // Pas de transformation si ce n'est pas un fichier Svelte
            if (!filename.endsWith('.svelte')) return { code: content };

            // Remplacer les attributs color="..." par les classes correspondantes
            let code = content;
            const colorPattern = /color=["']([^"']+)["']/g;

            code = code.replace(colorPattern, (match, aliasColor) => {
                // Si l'alias est dynamique (comme {color}), on ne le modifie pas
                if (aliasColor.startsWith('{') && aliasColor.endsWith('}')) {
                    return match;
                }

                // Vérifier si l'alias existe
                if (!colorAliases[aliasColor]) {
                    console.warn(
                        `[ColorPreprocessor] Attention: Alias de couleur inconnu "${aliasColor}" dans ${filename}`
                    );
                    return match;
                }

                // Remplacer l'attribut par une classe CSS
                return `class="color-${colorAliases[aliasColor]}"`;
            });

            return {
                code
            };
        },

        // Traiter le script Svelte
        script({ content, filename, attributes }) {
            // Pas de transformation si ce n'est pas un fichier Svelte ou pas de TypeScript
            if (!filename.endsWith('.svelte') || attributes.lang !== 'ts') return { code: content };

            // Injecter les types de couleurs dans les scripts TypeScript
            let code = content;

            // Injecter l'import pour les types de couleurs si nécessaire
            if (code.includes('export let color:') || code.includes('export let color =')) {
                if (!code.includes('import type { ComponentColor }')) {
                    code = `import type { ComponentColor } from '../theme/colorTypes';\n${code}`;
                }

                // Remplacer les définitions de props de couleur par le type ComponentColor
                code = code.replace(/export let color:.*?;/g, 'export let color: ComponentColor;');
                code = code.replace(/export let color =.*?;/g, 'export let color: ComponentColor = "blue";');

                // Pour Svelte 5 Rune
                code = code.replace(
                    /color = \$state\((.*?) as .*?\)/g,
                    'color = $state($1 as ComponentColor)'
                );
            }

            return {
                code
            };
        },

        // Traiter le style Svelte
        style({ content, filename }) {
            // Pas de transformation pour les fichiers de style
            return { code: content };
        }
    };
}

/**
 * Génère un fichier TypeScript avec les définitions de types pour les couleurs
 * @param {Object} colorAliases - Mappages des alias de couleurs
 */
function generateColorTypeDefinitions(colorAliases) {
    const outputPath = path.resolve(__dirname, '../theme/colorTypes.ts');

    // Générer le contenu du fichier
    const content = `// Ce fichier est généré automatiquement par le préprocesseur de couleurs
// Ne pas modifier manuellement

// Liste des couleurs Radix disponibles
export const RadixColors = [
  'tomato', 'red', 'crimson', 'pink', 'plum', 'purple', 'violet',
  'indigo', 'blue', 'cyan', 'teal', 'green', 'grass', 'brown',
  'orange', 'amber', 'yellow', 'lime', 'mint', 'olive', 'sand',
  'gold', 'bronze', 'gray', 'mauve', 'slate', 'sage', 'neutral'
] as const;

// Type pour les couleurs Radix
export type RadixColor = typeof RadixColors[number];

// Type pour les alias de couleurs disponibles
export type ComponentColor = ${Object.keys(colorAliases)
        .map((key) => `'${key}'`)
        .join(' | ')};

// Mapping des alias vers les couleurs Radix
export const colorAliases = ${JSON.stringify(colorAliases, null, 2)};

// Fonction pour obtenir la couleur Radix correspondant à un alias
export function getRadixColor(alias: ComponentColor): RadixColor {
  return colorAliases[alias] as RadixColor;
}
`;

    // Écrire le fichier
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);
}

/**
 * Génère un fichier CSS qui importe tous les fichiers de couleurs utilisés
 * @param {Object} colorAliases - Mappages des alias de couleurs
 * @param {string} colorFilesPath - Chemin vers les fichiers CSS de couleurs
 */
function generateColorStyleImports(colorAliases, colorFilesPath) {
    const outputPath = path.resolve(__dirname, '../styles/generated-colors.css');

    // Collecter toutes les couleurs Radix utilisées
    const usedRadixColors = new Set(Object.values(colorAliases));

    // Générer le contenu du fichier
    let content = '/* Ce fichier est généré automatiquement par le préprocesseur de couleurs */\n';
    content += '/* Ne pas modifier manuellement */\n\n';

    // Ajouter les imports pour chaque couleur utilisée
    for (const color of usedRadixColors) {
        content += `@import './colors/${color}.css';\n`;
    }

    // Écrire le fichier
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);
}
