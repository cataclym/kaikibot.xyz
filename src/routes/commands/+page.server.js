import 'dotenv/config';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {

  const url = process.env.JSON;

  if (!url) throw new Error("Missing commandlist JSON!")

  const res = await fetch(url);
  const commands = (await res.json()).sort();

  return {
    commands
  }
}
