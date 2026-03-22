import { JSDoc, Node } from 'ts-morph';
import type { JSDocTag } from '../types.js';

/**
 * JSDoc extraction result
 */
export interface JSDocResult {
    description?: string;
    tags: JSDocTag[];
}

/**
 * JSDoc extractor
 */
export class JSDocExtractor {
    /**
     * Extract JSDoc from a node
     */
    extract(node: Node): JSDocResult {
        const result: JSDocResult = {
            tags: []
        };

        // Use the first JSDoc comment
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [firstJsDoc] = (node as any).getJsDocs?.() as JSDoc[] | [];

        if (firstJsDoc) {
            // Extract description
            const description = this.extractDescription(firstJsDoc);
            if (description) {
                result.description = description;
            }

            // Extract tags
            result.tags = this.extractTags(firstJsDoc);
        }

        return result;
    }

    /**
     * Extract description from JSDoc
     */
    private extractDescription(jsDoc: JSDoc): string | undefined {
        const description = jsDoc.getDescription().trim();
        return description || undefined;
    }

    /**
     * Extract tags from JSDoc
     */
    private extractTags(jsDoc: JSDoc): JSDocTag[] {
        const tags: JSDocTag[] = [];
        const jsTags = jsDoc.getTags();

        for (const tag of jsTags) {
            const tagName = tag.getTagName();
            const comment = tag.getComment();

            let value: string | undefined;

            if (typeof comment === 'string') {
                value = comment.trim();
            } else if (Array.isArray(comment)) {
                value = comment
                    .map((c) => {
                        if (typeof c === 'string') {
                            return c;
                        }
                        return c?.getText?.() || '';
                    })
                    .join(' ')
                    .trim();
            }

            tags.push({
                name: tagName,
                value: value || undefined
            });
        }

        return tags;
    }
}
