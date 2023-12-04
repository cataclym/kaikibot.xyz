import 'dotenv/config';

const links = Object.freeze({
  changelog: process.env.CHANGELOG,
  discord: process.env.DISCORD,
  docs: process.env.DOCS,
  embed: process.env.EMBED,
  invite: process.env.INVITE,
  patreon: process.env.PATREON,
  paypal: process.env.PAYPAL,
  source: process.env.SOURCE,
  kofi: process.env.KOFI
});

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return { links };
}
