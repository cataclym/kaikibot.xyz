const escapeHtmlTable: { [i: string]: string } = Object.freeze({
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;",
	'"': "&quot;",
	"'": "&#39;",
	"`": "&#96;"
});
// Escape HTML to sanitize it
export default function escapeHtml(str: string) {
	return str.replace(/[<>&"'`]/g, (c) => escapeHtmlTable[c]);
}
