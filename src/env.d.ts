/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Analytics only loads in production builds. */
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  /** Search Console "HTML tag" verification token (the meta tag's content value). */
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
