/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    preflight: false,
  }
}
