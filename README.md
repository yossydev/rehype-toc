# Vite Rehype TOC Plugin

This Vite plugin automatically generates a table of contents (TOC) for your MDX files. When used in combination with rehypeHighlight, it enables both code syntax highlighting and table of contents generation, enhancing the readability of technical documents or blog posts.

## Features

- Analyzes headings in MDX files to generate a table of contents.
- Integration with rehypeHighlight for syntax highlighting of code blocks.
- Simple setup and configuration.

## Example

- [HonoX](https://github.com/yossydev/vite-rehype-toc/tree/main/examples/honox)

## Getting Started

1. Install Required Packages

First, install the vite-rehype-toc plugin and its dependencies into your project.

```
$ npm install vite-rehype-toc rehype-highlight
```

2. Update Your Vite Configuration

Open your vite.config.ts file and add the viteRehypeToc and rehypeHighlight plugins to the MDX configuration.


```ts
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import viteRehypeToc from 'vite-rehype-toc';

export default defineConfig({
  // Other configurations
  plugins: [
    mdx({
      jsxImportSource: "hono/jsx",
      remarkPlugins: [], // Any remark plugins you are using
      rehypePlugins: [rehypeHighlight, viteRehypeToc],
    }),
  ],
});
```

3. Use the TOC in Your MDX Files

The viteRehypeToc plugin will automatically analyze headings (h1, h2, etc.) in your MDX files to generate a table of contents. No additional setup is required.

## Configuration Options
The viteRehypeToc plugin supports the following options:

title: Specify the title of the table of contents. The default is "Table of Contents".
levels: Specify which heading levels to include in the table of contents. The default is ["h2", "h3"].
To use these options, configure the plugin like this:

```ts
rehypePlugins: [
    rehypeHighlight,
    [
        viteRehypeToc,
        {
            title: "Contents",
            levels: ["h2", "h3", "h4"],
        },
    ],
],
```

## License
This project is released under the MIT License.
