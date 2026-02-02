/**
 * Root documentation structure
 */
export interface LibraryDocumentation {
  /**
   * Library metadata
   */
  metadata: LibraryMetadata;
  /**
   * Documented components
   */
  components: ComponentDocumentation[];
  /**
   * Documented attachments
   */
  attachments: AttachmentDocumentation[];
  /**
   * Documented utilities
   */
  utilities: UtilityDocumentation[];
  /**
   * Documented builders
   */
  builders: BuilderDocumentation[];
  /**
   * Generation timestamp
   */
  generatedAt: string;
}

/**
 * Library metadata
 */
export interface LibraryMetadata {
  /**
   * Library name
   */
  name: string;
  /**
   * Library version
   */
  version?: string;
  /**
   * Source directory analyzed
   */
  sourceDirectory: string;
}

export interface BaseContentDocumentation {
  /**
   * Name
   */
  name: string;
  /**
   * File path relative to library root
   */
  filePath: string;
  /**
   * Description from JSDoc
   */
  description?: string;
  /**
   * Props type name
   */
  typeName: string;
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
}

/**
 * Component documentation
 */
export interface ComponentDocumentation extends BaseContentDocumentation {
  category: "component";
  /**
   * Component props
   */
  props: PropDocumentation[];
}

/**
 * Attachment documentation
 */
export interface AttachmentDocumentation extends BaseContentDocumentation {
  category: "attachment";
  /**
   * Attachment options
   */
  options: PropDocumentation[];
}

/**
 * Builder documentation
 */
export interface BuilderDocumentation extends BaseContentDocumentation {
  category: "builder";
  /**
   * Class name
   */
  className: string;
  /**
   * Class .d.ts definition
   */
  classDef?: string;
  /**
   * Type .d.ts definition
   */
  typeDef?: string;
  /**
   * Generic type parameters
   */
  generics?: GenericParameter[];
  /**
   * Source file for options type
   */
  typeSource: string;
}

/**
 * Utility documentation
 */
export interface UtilityDocumentation extends BaseContentDocumentation {
  category: "utility";
  /**
   * Class name
   */
  className: string;
  /**
   * Class .d.ts definition
   */
  classDef?: string;
  /**
   * Type .d.ts definition
   */
  typeDef?: string;
  /**
   * Generic type parameters
   */
  generics?: GenericParameter[];
  /**
   * Source file for options type
   */
  typeSource: string;
}

/**
 * Prop documentation
 */
export interface PropDocumentation {
  /**
   * Prop name
   */
  name: string;
  /**
   * Prop description from JSDoc
   */
  description?: string;
  /**
   * Prop type representation
   */
  type: TypeDocumentation;
  /**
   * Default value if detectable
   */
  defaultValue?: string;
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
  /**
   * Is prop optional
   */
  isOptional: boolean;
  /**
   * Is prop bindable ($bindable)
   */
  isBindable?: boolean;
  /**
   * Is prop a Snippet type
   */
  isSnippet?: boolean;
}

/**
 * Type documentation
 */
export interface TypeDocumentation {
  /**
   * Raw type as string
   */
  raw: string;
  /**
   * Type kind
   */
  kind: TypeKind;
  /**
   * For union types
   */
  unionTypes?: TypeDocumentation[];
  /**
   * For intersection types
   */
  intersectionTypes?: TypeDocumentation[];
  /**
   * For generic/reference types
   */
  typeName?: string;
  /**
   * Type arguments for generic types
   */
  typeArguments?: TypeDocumentation[];
  /**
   * For literal types
   */
  literalValue?: string | number | boolean;
  /**
   * Source file where type is defined (for imported types)
   */
  sourceFile?: string;
}
/**
 * Type kinds
 */
export type TypeKind =
  | "string"
  | "number"
  | "boolean"
  | "literal"
  | "union"
  | "intersection"
  | "reference"
  | "array"
  | "tuple"
  | "snippet"
  | "undefined"
  | "generic"
  //
  | "null"
  | "function"
  | "object"
  | "unknown";

/**
 * Generic parameter
 */
export interface GenericParameter {
  /**
   * Generic parameter name
   */
  name: string;
  raw?: string;
  /**
   * Constraint type if any
   */
  constraint?: TypeDocumentation;
  /**
   * Default type if any
   */
  default?: TypeDocumentation;
}

/**
 * JSDoc tag
 */
export interface JSDocTag {
  /**
   * Tag name (e.g., "example", "deprecated")
   */
  name: string;
  /**
   * Tag value/comment
   */
  value?: string;
  /**
   * Tag link
   */
  link?: string;
}
