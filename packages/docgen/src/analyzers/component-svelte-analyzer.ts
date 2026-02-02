import * as fs from "fs";
import { parse, type AST } from "svelte/compiler";

/**
 * Prop info extracted from Svelte component
 */
export interface SveltePropInfo {
  name: string;
  defaultValue?: string;
  isBindable: boolean;
}

/**
 * Svelte component analysis result
 */
export interface SvelteAnalysisResult {
  props: Map<string, SveltePropInfo>;
}

/**
 * Svelte component analyzer using svelte/compiler
 */
export class ComponentSvelteAnalyzer {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /**
   * Analyze Svelte component
   */
  analyze(): SvelteAnalysisResult {
    const content = fs.readFileSync(this.filePath, "utf-8");
    const ast = parse(content) as AST.Root;
    const props = this.extractPropsFromAST(ast);

    return { props };
  }

  /**
   * Extract props from Svelte AST
   */
  private extractPropsFromAST(ast: AST.Root): Map<string, SveltePropInfo> {
    const propsMap = new Map<string, SveltePropInfo>();

    // Find the script tag with instance code
    const instanceScript = ast.instance;

    if (!instanceScript) {
      return propsMap;
    }

    // Parse the script content to find $props() declaration
    const propsDeclaration = this.findPropsDeclaration(instanceScript);

    if (propsDeclaration) {
      this.extractPropsFromDeclaration(propsDeclaration, propsMap);
    }

    return propsMap;
  }

  /**
   * Find $props() declaration in script
   */
  private findPropsDeclaration(script: AST.Script): any {
    const body = script.content.body;

    for (const node of body) {
      // Look for: let { ... } = $props()
      if (
        node.type === "VariableDeclaration" &&
        node.kind === "let" &&
        node.declarations.length > 0
      ) {
        const declaration = node.declarations[0];

        // Check if init is CallExpression with callee $props
        if (
          declaration.init &&
          declaration.init.type === "CallExpression" &&
          declaration.init.callee.type === "Identifier" &&
          declaration.init.callee.name === "$props"
        ) {
          return declaration;
        }
      }
    }

    return null;
  }

  /**
   * Extract props from $props() declaration
   */
  private extractPropsFromDeclaration(
    declaration: any,
    propsMap: Map<string, SveltePropInfo>,
  ): void {
    const id = declaration.id;

    if (!id || id.type !== "ObjectPattern") {
      return;
    }

    // Parse object pattern properties
    for (const property of id.properties) {
      if (property.type === "Property") {
        const propName = this.getPropertyName(property);

        if (!propName) {
          continue;
        }

        const propInfo: SveltePropInfo = {
          name: propName,
          isBindable: false,
        };

        // Check for default value
        if (property.value.type === "AssignmentPattern") {
          const defaultValue = this.extractDefaultValue(property.value.right);
          propInfo.defaultValue = defaultValue;

          // Check if default is $bindable()
          if (this.isBindableCall(property.value.right)) {
            propInfo.isBindable = true;
            // $bindable() without arguments means no default value
            const bindableArg = this.getBindableArgument(property.value.right);
            if (bindableArg) {
              propInfo.defaultValue = bindableArg;
            } else {
              propInfo.defaultValue = undefined;
            }
          }
        }

        propsMap.set(propName, propInfo);
      } else if (property.type === "RestElement") {
        // Handle ...rest
        const restName = this.getRestElementName(property);
        if (restName) {
          propsMap.set(restName, {
            name: restName,
            isBindable: false,
          });
        }
      }
    }
  }

  /**
   * Get property name from Property node
   */
  private getPropertyName(property: any): string | null {
    if (property.key.type === "Identifier") {
      return property.key.name;
    }
    return null;
  }

  /**
   * Get rest element name
   */
  private getRestElementName(restElement: any): string | null {
    if (restElement.argument.type === "Identifier") {
      return restElement.argument.name;
    }
    return null;
  }

  /**
   * Extract default value as string
   */
  private extractDefaultValue(node: any): string | undefined {
    if (!node) {
      return undefined;
    }

    switch (node.type) {
      case "TSAsExpression": {
        return this.extractDefaultValue(node.expression);
      }
      case "Literal":
        return this.formatLiteralValue(node.value);

      case "Identifier":
        return node.name;

      case "UnaryExpression":
        // Handle -1, +1, etc.
        if (node.operator === "-" && node.argument.type === "Literal") {
          return `-${node.argument.value}`;
        }
        return undefined;

      case "ArrayExpression":
        return "[]";

      case "ObjectExpression":
        return "{}";

      case "CallExpression":
        // Skip $bindable() calls here - handled separately
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "$bindable"
        ) {
          return undefined;
        }
        return undefined;

      case "TemplateLiteral":
        // Template literals
        return this.extractTemplateLiteral(node);

      default:
        return undefined;
    }
  }

  /**
   * Format literal value
   */
  private formatLiteralValue(value: any): string {
    if (typeof value === "string") {
      return `"${value}"`;
    }
    if (value === null) {
      return "null";
    }
    if (value === undefined) {
      return "undefined";
    }
    return String(value);
  }

  /**
   * Extract template literal as string
   */
  private extractTemplateLiteral(node: any): string {
    // For simplicity, return backtick notation
    return "`...`";
  }

  /**
   * Check if node is a $bindable() call
   */
  private isBindableCall(node: any): boolean {
    return (
      node &&
      node.type === "CallExpression" &&
      node.callee.type === "Identifier" &&
      node.callee.name === "$bindable"
    );
  }

  /**
   * Get argument passed to $bindable(arg)
   */
  private getBindableArgument(node: any): string | undefined {
    if (!this.isBindableCall(node)) {
      return undefined;
    }

    if (node.arguments.length > 0) {
      return this.extractDefaultValue(node.arguments[0]);
    }

    return undefined;
  }
}
