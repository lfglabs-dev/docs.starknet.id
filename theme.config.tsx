import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import HeadComponent from "@components/head";

const config: DocsThemeConfig = {
  logo: <img src="/new-logo.svg" style={{ height: "36px", maxWidth: "172px" }} alt="Starknet-ID" />,
  project: {
    link: "https://github.com/lfglabs-dev",
  },
  chat: {
    link: "https://discord.gg/KQkPNymrE8",
  },
  docsRepositoryBase: "https://github.com/lfglabs-dev/docs.starknet.id",
  footer: { component: null },

  head: () => {
    const { title } = useConfig();
    return (
      <>
        <HeadComponent />
        <title>{title ?? "Starknet ID Docs"}</title>

        <meta property="og:image" content="https://docs.starknet.id/logo.png" />
        <meta name="twitter:image" content="https://docs.starknet.id/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    );
  },
};

export default config;
