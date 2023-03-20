import * as commands from "../../cmdlist.json";

// @ts-ignore
const cats = Object.entries(commands.default);

export default function search(input, category: { [key: string]: true }) {
  /**
   * Get input value in both firefox and chrome
   */
  const inputText = (input.originalTarget || input.target)?.value
    ?.toLowerCase()
    ?.trim();

  let mapped = cats.map((cm) => cm[1]);

  // Filter based on enabled category??
  if (Object.keys(category).length) {
    const cat = Object.keys(category).shift();
    mapped = mapped.filter((a) => a[0] === cat);
  }

  const filtered = mapped
    .map((cb) => cb[1])
    .flat()
    .filter((a: { id: string; aliases: any[] }) =>
      a.id.toLowerCase().includes(inputText || "")
    );

  return filtered
    .map((res, i) => {
      const cat = cats
        .map((a) => a[1])
        .find((a) => a[1].find((b) => b.id === res.id));
      if (!cat || !cat[0]) return;
      return [cats.findIndex((a) => a[0] === cat[0]), [cat[0], [res]]];
    })
    .filter(Boolean);
}
