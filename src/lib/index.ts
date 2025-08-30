import { env } from "$env/dynamic/private";

// place files you want to import through the `$lib` alias in this folder.
export const allowList = new Set(
    (env.ALLOW_USERS ?? "")
      .split(",")
      .filter(Boolean) // remove empty strings
      .map(id => BigInt(id.trim()))
  );