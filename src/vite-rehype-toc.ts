import { visit } from "unist-util-visit";
import { Root, Element, HeadingNode } from "./types";

interface TOCOptions {
  title?: string;
  levels?: string[];
}

function rehypeTOC(options: TOCOptions = {}): (tree: Root) => void {
  const { title = "目次", levels = ["h2", "h3"] } = options;

  return (tree) => {
    const headings: HeadingNode[] = [];
    visit(tree, "element", (node: Element) => {
      if (levels.includes(node.tagName)) {
        const id = createId(node);
        headings.push({ ...node, id } as HeadingNode);
        if (!node.properties) node.properties = {};
        node.properties.id = id;
      }
    });

    if (headings.length) {
      const toc = buildTOC(headings, title);
      tree.children.unshift(toc);
    }
  };
}

function createId(node: Element): string {
  return node.children
    .filter((child: any) => child.type === "text")
    .map((child: any) => child.value.replace(/\s+/g, "-").toLowerCase())
    .join("");
}

function buildTOC(headings: HeadingNode[], tocTitle: string): Element {
  const listItems: Element[] = headings.map((heading) => {
    const levelClass = getLevelClass(heading.tagName);
    return {
      type: "element",
      tagName: "li",
      properties: { className: [levelClass] },
      children: [
        {
          type: "element",
          tagName: "a",
          properties: { href: `#${heading.id}` },
          children: [...heading.children],
        },
      ],
    };
  });

  return {
    type: "element",
    tagName: "details",
    properties: { className: ["details-toc"] },
    children: [
      {
        type: "element",
        tagName: "summary",
        properties: {},
        children: [{ type: "text", value: tocTitle }],
      },
      {
        type: "element",
        tagName: "ul",
        properties: {},
        children: listItems,
      },
    ],
  };
}

function getLevelClass(tagName: string): string {
  switch (tagName) {
    case "h2":
      return "toc-level-2";
    case "h3":
      return "toc-level-3";
    default:
      return "";
  }
}

export default rehypeTOC;
