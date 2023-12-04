import type { Cmds } from "../ICmds";

export default function search(commands: Cmds, input:  Event & {currentTarget: (EventTarget & HTMLInputElement)}, category: { [key: string]: true }) {
  const cats = Object.entries(commands);

  /**
   * Get input value in both firefox and chrome
   */
  const inputText = input.currentTarget.value
    ?.toLowerCase()
    ?.trim();

  let mapped = cats.map((cm) => cm[1]);

  const cat = Object.keys(category)?.shift();

  // Filter based on enabled category??
  if (cat) {
    mapped = mapped.filter(a => a[0] === cat);
  }

  const filtered = mapped
    .map((cb) => cb[1])
    .flat()
    .filter(a =>
      a.id.toLowerCase().includes(inputText || "")
    );

  return filtered
    .map((res, i) => {

      if (!cat) return;

      return [String(cats.findIndex((a) => a[0] === cat)), [cat, [res]]];
    })
    .filter(Boolean as any as ExcludesFalse);
}

type ExcludesFalse = <T>(x: T | false) => x is T;
