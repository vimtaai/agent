import { themes as prismThemes } from "prism-react-renderer";

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "Agent JS",
  tagline: "Agent-based modelling in JavaScript",
  favicon: "img/favicon.ico",

  url: "https://vimtaai.github.io",
  baseUrl: "/agent/",
  trailingSlash: false,
  staticDirectories: ["examples"],

  organizationName: "vimtaai",
  projectName: "agent",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: { defaultLocale: "en", locales: ["en"] },

  themes: [
    ["@docusaurus/theme-classic", { customCss: "style/index.css" }]
  ],

  plugins: [
    ["content-docs", { id: "guide", path: "pages/guide", routeBasePath: "/" }],
    ["content-docs", { id: "reference", path: "pages/reference", routeBasePath: "/reference" }],
    ["content-docs", { id: "examples", path: "pages/examples", routeBasePath: "/examples" }],
  ],

  themeConfig: {
    navbar: {
      title: "Agent JS",
      items: [
        { label: "Guide", type: "doc", docId: "about", docsPluginId: "guide" },
        { label: "Reference", type: "doc", docId: "index", docsPluginId: "reference" },
        { label: "Examples", type: "doc", docId: "index", docsPluginId: "examples" },
        { label: "GitHub", href: "https://github.com/vimtaai/agent", position: "right" },
      ]
    },
    tableOfContents: {
      maxHeadingLevel: 2
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};

export default config;
