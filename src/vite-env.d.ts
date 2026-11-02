/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL?: string;
  readonly VITE_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// SCSS module declarations
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const content: string;
  export default content;
}
