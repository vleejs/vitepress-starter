import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
  defineConfig({
    title: 'VitePress-starter',
    description: 'use VitePress',

    lastUpdated: true,

    // mermaid: {
    //   // refer https://mermaid-js.github.io/mermaid/#/Setup for options
    // },
  })
);
