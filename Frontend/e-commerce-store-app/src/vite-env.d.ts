/// <reference types="vite/client" />

interface ImportMetaEnv {
    // environment variables
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}