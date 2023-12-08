import { LINKS } from "../CONSTANTS";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return { LINKS };
}
