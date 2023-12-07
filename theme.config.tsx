import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";

const config: DocsThemeConfig = {
  logo: (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        gap: "1rem",
      }}
    >
      <Image
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Obsidian_software_logo.svg/1200px-Obsidian_software_logo.svg.png"
        }
        width={24}
        height={24}
        alt="Obsidian Logo"
      />
      Hyunyoung's Obsidian
    </span>
  ),
  project: {
    link: "https://github.com/Heavyrisem/nextra_obsidian_publish",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
};

export default config;
