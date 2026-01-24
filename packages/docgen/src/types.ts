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
  builders: UtilityDocumentation[];
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

/**
 * Component documentation
 */
export interface ComponentDocumentation {
  /**
   * Component name
   */
  name: string;
  /**
   * Component file path relative to library root
   */
  filePath: string;
  /**
   * Component description from JSDoc
   */
  description?: string;
  /**
   * Component props type name
   */
  propsTypeName: string;
  /**
   * Component props
   */
  props: PropDocumentation[];
  /**
   * Generic type parameters
   */
  generics?: GenericParameter[];
  /**
   * HTML element extended (if applicable)
   */
  extendsElement?: HTMLElementExtension;
  /**
   * Internal types extended (utility classes, state options, etc.)
   */
  extendsTypes?: TypeExtension[];
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
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
   * Prop type representation
   */
  type: TypeDocumentation;
  /**
   * Is prop optional
   */
  optional: boolean;
  /**
   * Default value if detectable
   */
  defaultValue?: string;
  /**
   * Prop description from JSDoc
   */
  description?: string;
  /**
   * Is prop bindable ($bindable)
   */
  isBindable: boolean;
  /**
   * Is prop a Snippet type
   */
  isSnippet: boolean;
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
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
  | "undefined"
  | "null"
  | "literal"
  | "union"
  | "intersection"
  | "reference"
  | "array"
  | "tuple"
  | "function"
  | "object"
  | "snippet"
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
 * HTML element extension info
 */
export interface HTMLElementExtension {
  /**
   * Element tag name (div, button, input, etc.)
   */
  elementType: string;
  /**
   * Source of the extension (svelte/elements)
   */
  source: string;
  /**
   * Original type name (HTMLInputAttributes, etc.)
   */
  typeName: string;
  /**
   * Omitted props from the HTML type
   */
  omittedProps?: string[];
}

/**
 * Internal type extension info (utility classes, state options, etc.)
 */
export interface TypeExtension {
  /**
   * Type name being extended
   */
  typeName: string;
  /**
   * Source file path relative to library root
   */
  source: string;
  /**
   * Type arguments if generic
   */
  typeArguments?: TypeDocumentation[];
}

/**
 * Attachment documentation
 */
export interface AttachmentDocumentation {
  /**
   * Attachment function name
   */
  name: string;
  /**
   * Attachment file path relative to library root
   */
  filePath: string;
  /**
   * Attachment description from JSDoc
   */
  description?: string;
  /**
   * Options type name
   */
  optionsTypeName: string;
  /**
   * Attachment options (parameters)
   */
  options: OptionDocumentation[];
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
}

/**
 * Option documentation (for attachments)
 */
export interface OptionDocumentation {
  /**
   * Option name
   */
  name: string;
  /**
   * Option type representation
   */
  type: TypeDocumentation;
  /**
   * Is option optional
   */
  optional: boolean;
  /**
   * Default value from @default JSDoc tag
   */
  defaultValue?: string;
  /**
   * Option description from JSDoc
   */
  description?: string;
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
}

/**
 * Utility documentation (minimaliste)
 */
export interface UtilityDocumentation {
  /**
   * Utility class name
   */
  name: string;
  /**
   * Utility file path relative to library root
   */
  filePath: string;
  /**
   * Utility description from JSDoc
   */
  description?: string;
  /**
   * Class name
   */
  className: string;
  /**
   * Generic type parameters
   */
  generics?: GenericParameter[];
  /**
   * Options type name for constructor
   */
  optionsTypeName: string;
  /**
   * Source file for options type
   */
  optionsTypeSource: string;
  /**
   * Additional JSDoc tags
   */
  tags?: JSDocTag[];
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
}
