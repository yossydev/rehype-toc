/**
 * TODO
 * Since unist is not published as an npm package, I get an error when I publish it to jsr.
 * So I decided to define the type by myself, but it's not a very good way, so I want to fix it somehow.
 */
interface Point {
  line: number;
  column: number;
  offset?: number | undefined;
}

interface Position {
  start: Point;
  end: Point;
}

interface Node {
  type: string;
  // biome-ignore lint: TODO: If there's a good mold, I'd like to wear it.
  data?: any;
  position?: Position | undefined;
}

interface Element extends Node {
  type: "element";
  tagName: string;
  // biome-ignore lint: TODO: If there's a good mold, I'd like to wear it.
  properties?: { [key: string]: any };
  children: Array<Element | Text>;
}

interface Text extends Node {
  type: "text";
  value: string;
}

interface Root extends Node {
  children: Array<Element | Text>;
}

interface HeadingNode extends Element {
  id: string;
}

export type { Root, Text, Element, HeadingNode };
