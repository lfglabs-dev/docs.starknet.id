import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import HeadComponent from "@components/head";

const config: DocsThemeConfig = {
  logo: <img src="/logo.svg" style={{ height: "60px" }} />,
  project: {
    link: "https://github.com/lfglabs-dev",
  },
  chat: {
    link: "https://discord.gg/KQkPNymrE8",
  },
  docsRepositoryBase: "https://github.com/lfglabs-dev/docs.starknet.id",
  footer: { component: null },
  head: () => {
    const { title } = useConfig()
    return (
      <>
        <HeadComponent />
        <title>{title ?? "Starknet ID Docs"}</title>
      </>
    )
  },
};

export default config;
