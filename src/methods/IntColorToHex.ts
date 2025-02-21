export default function IntColorToHex(input: string | number) {
	return `#${Number(input)?.toString(16).padStart(6, "0")}`;
}
