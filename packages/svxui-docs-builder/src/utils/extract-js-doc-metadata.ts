import { Node } from 'ts-morph';
import { JsDocMetadata } from '../types';

/**
 * Try to find js doc comments
 * @param valueDeclaration
 * @returns
 */
export function extractJsDocMetadata(valueDeclaration?: Node): JsDocMetadata[] {
    let jsDoc: JsDocMetadata[] = [];
    if (valueDeclaration && Node.isJSDocable(valueDeclaration)) {
        const jsDocComments = valueDeclaration.getJsDocs();
        if (jsDocComments.length > 0) {
            jsDoc = jsDocComments.map(
                (j) =>
                    ({
                        text: j.getText(),
                        commentText: j.getCommentText(),
                        tags: j.getTags().map((t) => ({
                            name: t.getTagName(),
                            text: t.getText(),
                            comment: t.getComment()
                        }))
                    }) as JsDocMetadata
            );
        }
    }
    return jsDoc;
}
