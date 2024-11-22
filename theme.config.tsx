import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
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
  useNextSeoProps() {
    return {
      titleTemplate: "%s",
    };
  },
  head: <HeadComponent />,
};

export default config;
