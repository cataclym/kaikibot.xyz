	// Removes leading/trailing spaces and collapses multiple spaces
	export default function SanitizeInput(input: string): string {
		return input
		.trim()                    
		.replace(/\s+/g, " ");    
	} 