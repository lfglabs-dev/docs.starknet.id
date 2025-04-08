import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/docs/guide/:slug(typescript|latex|tailwind-css|mermaid)",
      destination: "/docs/guide/advanced/:slug",
      permanent: true,
    },
    {
      source: "/docs/docs-theme/built-ins/:slug(callout|steps|tabs)",
      destination: "/docs/guide/built-ins/:slug",
      permanent: true,
    },
  ],
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.*\.svg$/;

    // Safely find the default SVG loader rule
    const fileLoaderRule = config.module.rules.find(
      (rule) =>
        rule.test && rule.test instanceof RegExp && rule.test.test(".svg")
    );

    // Exclude your custom SVG path
    if (fileLoaderRule) {
      fileLoaderRule.exclude = allowedSvgRegex;
    }

    // Add your custom rule for handling SVGs with @svgr/webpack
    config.module.rules.push({
      test: allowedSvgRegex,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withNextra(nextConfig);
