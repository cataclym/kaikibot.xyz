import { fail } from '@sveltejs/kit';
import CreateHeaders from '../../../../methods/CreateHeaders';
import { USER_API_PORT, USER_API_URL } from '$env/static/private';
import type { Todo } from 'kaikiwa-types';
import { DeleteTodos } from '../../../../methods/DeleteTodos';
import { AddTodo } from '../../../../methods/AddTodo';
import EscapeHtml from '../../../../methods/EscapeHtml';
import SanitizeInput from '../../../../methods/SanitizeInput';

export async function load({ parent, fetch }) {
	const { responseData } = await parent();

	if (!responseData) return fail(500);

	const headers = CreateHeaders();

	const url = new URL(`${USER_API_URL}:${USER_API_PORT}/API/User/${responseData?.userData?.UserId}/todos`);

	const res = await fetch(url, {
		method: "GET",
		headers,
	});

	let json: { todos: Todo[] } | undefined = undefined;
	
	if (res.ok) {
		json = await res.json();
	}

	return { responseData, todos: json?.todos };
}

export const actions = {
	deleteTodos: async ({ request, params }) => { 
		const formData = await request.formData();
		const ids = formData.get("todoIds") as string;
		// Validate
		if (!ids) return fail(400, { message: "No ids were selected."})

		return DeleteTodos(ids, params.user);
	},
	addTodo: async ({ request, params }) => {
		const formData = await request.formData();

		const body = JSON.stringify({
			String: EscapeHtml(SanitizeInput((formData.get("todoText")! as string).slice(0, 204)))
		});

		return AddTodo(body, params.user);
	},
}