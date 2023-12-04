
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/** @returns {void} */
	function noop() {}

	/** @returns {void} */
	function add_location(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	/**
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function run_all(fns) {
		fns.forEach(run);
	}

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	/** @returns {boolean} */
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
	}

	let src_url_equal_anchor;

	/**
	 * @param {string} element_src
	 * @param {string} url
	 * @returns {boolean}
	 */
	function src_url_equal(element_src, url) {
		if (element_src === url) return true;
		if (!src_url_equal_anchor) {
			src_url_equal_anchor = document.createElement('a');
		}
		// This is actually faster than doing URL(..).href
		src_url_equal_anchor.href = url;
		return element_src === src_url_equal_anchor.href;
	}

	/** @returns {boolean} */
	function is_empty(obj) {
		return Object.keys(obj).length === 0;
	}

	function null_to_empty(value) {
		return value == null ? '' : value;
	}

	/** @type {typeof globalThis} */
	const globals =
		typeof window !== 'undefined'
			? window
			: typeof globalThis !== 'undefined'
			? globalThis
			: // @ts-ignore Node typings have this
			  global;

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 * @returns {void} */
	function destroy_each(iterations, detaching) {
		for (let i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detaching);
		}
	}

	/**
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} name
	 * @returns {HTMLElementTagNameMap[K]}
	 */
	function element(name) {
		return document.createElement(name);
	}

	/**
	 * @template {keyof SVGElementTagNameMap} K
	 * @param {K} name
	 * @returns {SVGElement}
	 */
	function svg_element(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	function text(data) {
		return document.createTextNode(data);
	}

	/**
	 * @returns {Text} */
	function space() {
		return text(' ');
	}

	/**
	 * @returns {Text} */
	function empty() {
		return text('');
	}

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @returns {() => void}
	 */
	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	/**
	 * @param {Element} element
	 * @returns {ChildNode[]}
	 */
	function children(element) {
		return Array.from(element.childNodes);
	}

	/**
	 * @returns {void} */
	function toggle_class(element, name, toggle) {
		// The `!!` is required because an `undefined` flag means flipping the current state.
		element.classList.toggle(name, !!toggle);
	}

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
	 * @returns {CustomEvent<T>}
	 */
	function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
		return new CustomEvent(type, { detail, bubbles, cancelable });
	}

	/**
	 * @typedef {Node & {
	 * 	claim_order?: number;
	 * 	hydrate_init?: true;
	 * 	actual_end_child?: NodeEx;
	 * 	childNodes: NodeListOf<NodeEx>;
	 * }} NodeEx
	 */

	/** @typedef {ChildNode & NodeEx} ChildNodeEx */

	/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

	/**
	 * @typedef {ChildNodeEx[] & {
	 * 	claim_info?: {
	 * 		last_index: number;
	 * 		total_claimed: number;
	 * 	};
	 * }} ChildNodeArray
	 */

	let current_component;

	/** @returns {void} */
	function set_current_component(component) {
		current_component = component;
	}

	const dirty_components = [];
	const binding_callbacks = [];

	let render_callbacks = [];

	const flush_callbacks = [];

	const resolved_promise = /* @__PURE__ */ Promise.resolve();

	let update_scheduled = false;

	/** @returns {void} */
	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	/** @returns {void} */
	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	// flush() calls callbacks in this order:
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.
	const seen_callbacks = new Set();

	let flushidx = 0; // Do *not* move this inside the flush() function

	/** @returns {void} */
	function flush() {
		// Do not reenter flush while dirty components are updated, as this can
		// result in an infinite loop. Instead, let the inner flush handle it.
		// Reentrancy is ok afterwards for bindings etc.
		if (flushidx !== 0) {
			return;
		}
		const saved_component = current_component;
		do {
			// first, call beforeUpdate functions
			// and update components
			try {
				while (flushidx < dirty_components.length) {
					const component = dirty_components[flushidx];
					flushidx++;
					set_current_component(component);
					update(component.$$);
				}
			} catch (e) {
				// reset dirty state to not end up in a deadlocked state and then rethrow
				dirty_components.length = 0;
				flushidx = 0;
				throw e;
			}
			set_current_component(null);
			dirty_components.length = 0;
			flushidx = 0;
			while (binding_callbacks.length) binding_callbacks.pop()();
			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			for (let i = 0; i < render_callbacks.length; i += 1) {
				const callback = render_callbacks[i];
				if (!seen_callbacks.has(callback)) {
					// ...so guard against infinite loops
					seen_callbacks.add(callback);
					callback();
				}
			}
			render_callbacks.length = 0;
		} while (dirty_components.length);
		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}
		update_scheduled = false;
		seen_callbacks.clear();
		set_current_component(saved_component);
	}

	/** @returns {void} */
	function update($$) {
		if ($$.fragment !== null) {
			$$.update();
			run_all($$.before_update);
			const dirty = $$.dirty;
			$$.dirty = [-1];
			$$.fragment && $$.fragment.p($$.ctx, dirty);
			$$.after_update.forEach(add_render_callback);
		}
	}

	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function flush_render_callbacks(fns) {
		const filtered = [];
		const targets = [];
		render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
		targets.forEach((c) => c());
		render_callbacks = filtered;
	}

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} [local]
	 * @returns {void}
	 */
	function transition_in(block, local) {
		if (block && block.i) {
			outroing.delete(block);
			block.i(local);
		}
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} local
	 * @param {0 | 1} [detach]
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	function transition_out(block, local, detach, callback) {
		if (block && block.o) {
			if (outroing.has(block)) return;
			outroing.add(block);
			outros.c.push(() => {
				outroing.delete(block);
				if (callback) {
					if (detach) block.d(1);
					callback();
				}
			});
			block.o(local);
		} else if (callback) {
			callback();
		}
	}

	/** @typedef {1} INTRO */
	/** @typedef {0} OUTRO */
	/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
	/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

	/**
	 * @typedef {Object} Outro
	 * @property {number} r
	 * @property {Function[]} c
	 * @property {Object} p
	 */

	/**
	 * @typedef {Object} PendingProgram
	 * @property {number} start
	 * @property {INTRO|OUTRO} b
	 * @property {Outro} [group]
	 */

	/**
	 * @typedef {Object} Program
	 * @property {number} a
	 * @property {INTRO|OUTRO} b
	 * @property {1|-1} d
	 * @property {number} duration
	 * @property {number} start
	 * @property {number} end
	 * @property {Outro} [group]
	 */

	// general each functions:

	function ensure_array_like(array_like_or_iterator) {
		return array_like_or_iterator?.length !== undefined
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}

	/** @returns {void} */
	function create_component(block) {
		block && block.c();
	}

	/** @returns {void} */
	function mount_component(component, target, anchor) {
		const { fragment, after_update } = component.$$;
		fragment && fragment.m(target, anchor);
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
			// if the component was destroyed immediately
			// it will update the `$$.on_destroy` reference to `null`.
			// the destructured on_destroy may still reference to the old array
			if (component.$$.on_destroy) {
				component.$$.on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
		after_update.forEach(add_render_callback);
	}

	/** @returns {void} */
	function destroy_component(component, detaching) {
		const $$ = component.$$;
		if ($$.fragment !== null) {
			flush_render_callbacks($$.after_update);
			run_all($$.on_destroy);
			$$.fragment && $$.fragment.d(detaching);
			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			$$.on_destroy = $$.fragment = null;
			$$.ctx = [];
		}
	}

	/** @returns {void} */
	function make_dirty(component, i) {
		if (component.$$.dirty[0] === -1) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty.fill(0);
		}
		component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
	}

	// TODO: Document the other params
	/**
	 * @param {SvelteComponent} component
	 * @param {import('./public.js').ComponentConstructorOptions} options
	 *
	 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
	 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
	 * This will be the `add_css` function from the compiled component.
	 *
	 * @returns {void}
	 */
	function init(
		component,
		options,
		instance,
		create_fragment,
		not_equal,
		props,
		append_styles = null,
		dirty = [-1]
	) {
		const parent_component = current_component;
		set_current_component(component);
		/** @type {import('./private.js').T$$} */
		const $$ = (component.$$ = {
			fragment: null,
			ctx: [],
			// state
			props,
			update: noop,
			not_equal,
			bound: blank_object(),
			// lifecycle
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
			// everything else
			callbacks: blank_object(),
			dirty,
			skip_bound: false,
			root: options.target || parent_component.$$.root
		});
		append_styles && append_styles($$.root);
		let ready = false;
		$$.ctx = instance
			? instance(component, options.props || {}, (i, ret, ...rest) => {
					const value = rest.length ? rest[0] : ret;
					if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}
					return ret;
			  })
			: [];
		$$.update();
		ready = true;
		run_all($$.before_update);
		// `false` as a special case of no DOM component
		$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
		if (options.target) {
			if (options.hydrate) {
				// TODO: what is the correct type here?
				// @ts-expect-error
				const nodes = children(options.target);
				$$.fragment && $$.fragment.l(nodes);
				nodes.forEach(detach);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.c();
			}
			if (options.intro) transition_in(component.$$.fragment);
			mount_component(component, options.target, options.anchor);
			flush();
		}
		set_current_component(parent_component);
	}

	/**
	 * Base class for Svelte components. Used when dev=false.
	 *
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 */
	class SvelteComponent {
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$ = undefined;
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$set = undefined;

		/** @returns {void} */
		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop;
		}

		/**
		 * @template {Extract<keyof Events, string>} K
		 * @param {K} type
		 * @param {((e: Events[K]) => void) | null | undefined} callback
		 * @returns {() => void}
		 */
		$on(type, callback) {
			if (!is_function(callback)) {
				return noop;
			}
			const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
			callbacks.push(callback);
			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		/**
		 * @param {Partial<Props>} props
		 * @returns {void}
		 */
		$set(props) {
			if (this.$$set && !is_empty(props)) {
				this.$$.skip_bound = true;
				this.$$set(props);
				this.$$.skip_bound = false;
			}
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	// generated during release, do not modify

	/**
	 * The current version, as set in package.json.
	 *
	 * https://svelte.dev/docs/svelte-compiler#svelte-version
	 * @type {string}
	 */
	const VERSION = '4.2.8';
	const PUBLIC_VERSION = '4';

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @returns {void}
	 */
	function dispatch_dev(type, detail) {
		document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append_dev(target, node) {
		dispatch_dev('SvelteDOMInsert', { target, node });
		append(target, node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert_dev(target, node, anchor) {
		dispatch_dev('SvelteDOMInsert', { target, node, anchor });
		insert(target, node, anchor);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach_dev(node) {
		dispatch_dev('SvelteDOMRemove', { node });
		detach(node);
	}

	/**
	 * @param {Node} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @param {boolean} [has_prevent_default]
	 * @param {boolean} [has_stop_propagation]
	 * @param {boolean} [has_stop_immediate_propagation]
	 * @returns {() => void}
	 */
	function listen_dev(
		node,
		event,
		handler,
		options,
		has_prevent_default,
		has_stop_propagation,
		has_stop_immediate_propagation
	) {
		const modifiers =
			options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
		if (has_prevent_default) modifiers.push('preventDefault');
		if (has_stop_propagation) modifiers.push('stopPropagation');
		if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
		dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
		const dispose = listen(node, event, handler, options);
		return () => {
			dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
			dispose();
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr_dev(node, attribute, value) {
		attr(node, attribute, value);
		if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
		else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}

	/**
	 * @param {Text} text
	 * @param {unknown} data
	 * @returns {void}
	 */
	function set_data_dev(text, data) {
		data = '' + data;
		if (text.data === data) return;
		dispatch_dev('SvelteDOMSetData', { node: text, data });
		text.data = /** @type {string} */ (data);
	}

	function ensure_array_like_dev(arg) {
		if (
			typeof arg !== 'string' &&
			!(arg && typeof arg === 'object' && 'length' in arg) &&
			!(typeof Symbol === 'function' && arg && Symbol.iterator in arg)
		) {
			throw new Error('{#each} only works with iterable values.');
		}
		return ensure_array_like(arg);
	}

	/**
	 * @returns {void} */
	function validate_slots(name, slot, keys) {
		for (const slot_key of Object.keys(slot)) {
			if (!~keys.indexOf(slot_key)) {
				console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
			}
		}
	}

	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 *
	 * Can be used to create strongly typed Svelte components.
	 *
	 * #### Example:
	 *
	 * You have component library on npm called `component-library`, from which
	 * you export a component called `MyComponent`. For Svelte+TypeScript users,
	 * you want to provide typings. Therefore you create a `index.d.ts`:
	 * ```ts
	 * import { SvelteComponent } from "svelte";
	 * export class MyComponent extends SvelteComponent<{foo: string}> {}
	 * ```
	 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
	 * to provide intellisense and to use the component like this in a Svelte file
	 * with TypeScript:
	 * ```svelte
	 * <script lang="ts">
	 * 	import { MyComponent } from "component-library";
	 * </script>
	 * <MyComponent foo={'bar'} />
	 * ```
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 * @template {Record<string, any>} [Slots=any]
	 * @extends {SvelteComponent<Props, Events>}
	 */
	class SvelteComponentDev extends SvelteComponent {
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Props}
		 */
		$$prop_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Events}
		 */
		$$events_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Slots}
		 */
		$$slot_def;

		/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
		constructor(options) {
			if (!options || (!options.target && !options.$$inline)) {
				throw new Error("'target' is a required option");
			}
			super();
		}

		/** @returns {void} */
		$destroy() {
			super.$destroy();
			this.$destroy = () => {
				console.warn('Component was already destroyed'); // eslint-disable-line no-console
			};
		}

		/** @returns {void} */
		$capture_state() {}

		/** @returns {void} */
		$inject_state() {}
	}

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

	var cmdlist = [["Administration",[{id:"ban",aliases:["ban","bean","b"],channel:"guild",ownerOnly:false,usage:"@notdreb Your behaviour is harmful",userPermissions:"BanMembers",description:"Bans a user by ID or name with an optional message."},{id:"deletechannel",aliases:["deletechannel","dtchnl","delchan"],channel:"guild",ownerOnly:false,usage:"#channel1 #channel2 #channel3",userPermissions:"ManageChannels",description:"Deletes one or more channels. Also deletes categories, threads and voice channels."},{id:"nsfwtgl",aliases:["nsfwtgl","nsfw","nsfwtoggle"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"ManageChannels",description:"Toggles NSFW in current channel"},{id:"unban",aliases:["unban","ub"],channel:"guild",ownerOnly:false,userPermissions:"BanMembers",description:""}]],["Anime",[{id:"anime",aliases:["anime"],ownerOnly:false,usage:"Tsukimonogatari",userPermissions:"",description:"Shows the first result of a query to Anilist"},{id:"animequote",aliases:["animequote","aq"],ownerOnly:false,usage:"",userPermissions:"",description:"Shows a random anime quote..."},{id:"manga",aliases:["manga"],ownerOnly:false,usage:"Tsukimonogatari",userPermissions:"",description:"Shows the first result of a query to Anilist"}]],["Emotes",[{id:"addemote",aliases:["addemote","ae"],channel:"guild",ownerOnly:false,usage:"image-link Emotename",userPermissions:"ManageEmojisAndStickers",description:"Adds an emote from an image link or attached image, with an optional name."},{id:"deleteemote",aliases:["deleteemote","de"],channel:"guild",ownerOnly:false,usage:"<:NadekoSip:>",userPermissions:"ManageEmojisAndStickers",description:"Deletes one or multiple emotes/emoji. Multiple emotes take longer, to avoid ratelimits. Keep a space between all emotes you wish to delete."},{id:"emotecount",aliases:["emotecount","emojicount","ec"],channel:"guild",ownerOnly:false,usage:["","-s","--small"],userPermissions:"",description:"Shows amount of times each emote has been used"}]],["Etc",[]],["Fun",[{id:"compress",aliases:["compress"],ownerOnly:false,usage:"@dreb",userPermissions:"",description:"Compresses given member's avatar..."},{id:"dadjoke",aliases:["dadjoke","dadjokes"],ownerOnly:false,userPermissions:"",description:"Returns a dadjoke."},{id:"deadbeat",aliases:["dead","deadbeat"],ownerOnly:false,usage:"@dreb",userPermissions:"",description:"Just try it"},{id:"meow",aliases:["meow"],ownerOnly:false,usage:"",userPermissions:"",description:"Meow."},{id:"names",aliases:["name","names"],ownerOnly:false,usage:["@dreb","delete"],userPermissions:"",description:"Returns yours or mentioned user's daddy nicknames. Delete your nicknames with 'delete' argument."},{id:"neofetch",aliases:["neofetch","neo"],ownerOnly:false,usage:["","opensuse","list"],userPermissions:"",description:"Displays neofetch ascii art. Provide argument 'list' to get a list of all supported distros."},{id:"reddit",aliases:["reddit"],ownerOnly:false,usage:"anime",userPermissions:"",description:"Returns a random reddit post, from a specified subreddit."},{id:"squish",aliases:["squish"],ownerOnly:false,usage:"@dreb",userPermissions:"",description:"Squishes given member's avatar"},{id:"stretch",aliases:["stretch"],ownerOnly:false,usage:"@dreb",userPermissions:"",description:"Stretches given member's avatar"},{id:"tictactoe",aliases:["tictactoe","ttt"],channel:"guild",ownerOnly:false,usage:"@Dreb",userPermissions:"",description:"Starts a TicTacToe game, where you play against an @mentioned person."},{id:"woof",aliases:["woof"],ownerOnly:false,usage:"",userPermissions:"",description:"Woof."}]],["Gambling",[{id:"award",aliases:["award"],ownerOnly:true,usage:"50 @Cata",userPermissions:"",description:"For bot owner to award currency"},{id:"betflip",aliases:["betflip","bf"],ownerOnly:false,usage:["5 heads","10 t"],userPermissions:"",description:"Bet on tails or heads. Guessing correct awards you 1.95x the currency you've bet."},{id:"betroll",aliases:["betroll","br"],ownerOnly:false,usage:"69",userPermissions:"",description:"Bet an amount of currency and roll the dice. Rolling above 66 yields x2 the amount bet. Above 90 - x4 and 100 gives x10!"},{id:"cash",aliases:["cash","currency","cur","$","¥","£","€"],ownerOnly:false,usage:"",userPermissions:"",description:"Shows specified user's current balance. If no user is specified, shows your balance"},{id:"currencytransactions",aliases:["currencytransactions","curtrs"],ownerOnly:false,usage:["","7","10 @drev"],userPermissions:"",description:"Shows your currency transactions. Bot owner can see other people's transactions."},{id:"daily",aliases:["daily"],ownerOnly:false,usage:"",userPermissions:"",description:"Claim your daily currency allowance"},{id:"economy",aliases:["economy","eco"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"",description:"Displays overall currency statistics."},{id:"give",aliases:["give"],ownerOnly:false,usage:"50 @Cata",userPermissions:"",description:"Gives money to another user"},{id:"leaderboard",aliases:["leaderboard","lb"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"",description:"Shows currency leaderboard for the current server."},{id:"Slots",aliases:["slots","slot"],ownerOnly:false,usage:"69",userPermissions:"",description:"Bet a certain amount in the slot machine."},{id:"take",aliases:["take"],ownerOnly:true,usage:"50 @Cata",userPermissions:"",description:"Takes money from the specified user"}]],["Images",[{id:"catgirl",aliases:["catgirl"],ownerOnly:false,usage:[""],userPermissions:"",description:"Spawn a catgirl picture"},{id:"maid",aliases:["maid"],ownerOnly:false,usage:[""],userPermissions:"",description:"Returns anime maids."},{id:"marin",aliases:["marin"],ownerOnly:false,usage:[""],userPermissions:"",description:"Returns an image of Marin Kitagawa"},{id:"megumin",aliases:["megumin"],ownerOnly:false,usage:[""],userPermissions:"",description:"Spawn a shinobu picture"},{id:"neko",aliases:["neko"],ownerOnly:false,usage:[""],userPermissions:"",description:"Spawn a neko picture"},{id:"selfies",aliases:["selfies"],ownerOnly:false,usage:[""],userPermissions:"",description:"Returns anime girl selfies"},{id:"shinobu",aliases:["shinobu"],ownerOnly:false,usage:[""],userPermissions:"",description:"Spawn a shinobu picture"},{id:"uniform",aliases:["uniform"],ownerOnly:false,usage:[""],userPermissions:"",description:"Returns anime girls in uniforms."},{id:"waifu",aliases:["waifu"],ownerOnly:false,usage:[""],userPermissions:"",description:"Spawn a waifu picture"}]],["Interactions",[{id:"bite",aliases:["bite"],ownerOnly:false,usage:[""],userPermissions:"",description:"Bite someone >:)"},{id:"blush",aliases:["blush"],ownerOnly:false,usage:[""],userPermissions:"",description:"O//////O"},{id:"bonk",aliases:["bonk"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"When you need to bonk some horny teens"},{id:"bully",aliases:["bully","bulli"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Be a bully to someone"},{id:"cuddle",aliases:["cuddle"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Cuddle someone!"},{id:"feed",aliases:["feed"],ownerOnly:false,usage:[""],userPermissions:"",description:"When you need to feed someone...?"},{id:"hug",aliases:["hug","hugs"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Hug a good friend, or maybe someone special ;>"},{id:"kiss",aliases:["kiss","smooch"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"OwO 2lood4me"},{id:"lick",aliases:["lick"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Lick someone... I guess...?"},{id:"nom",aliases:["nom"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Nom someone, cus you're hungry"},{id:"pat",aliases:["pat"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Pat a cat!\nOr a guildmember..."},{id:"peek",aliases:["peek"],ownerOnly:false,usage:[""],userPermissions:"",description:"Peek around the corner"},{id:"pout",aliases:["pout"],ownerOnly:false,usage:[""],userPermissions:"",description:"I am not angry, b-baka"},{id:"run",aliases:["run"],ownerOnly:false,usage:[""],userPermissions:"",description:"Gotta go fast~"},{id:"slap",aliases:["slap"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Slap someone who's being stupid"},{id:"spank",aliases:["spank"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"OwO Being naughty are we?"},{id:"yeet",aliases:["yeet"],ownerOnly:false,usage:["","@dreb"],userPermissions:"",description:"Yeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeet"}]],["Moderation",[{id:"clear",aliases:["clear","prune"],channel:"guild",ownerOnly:false,usage:"69",userPermissions:"ManageMessages",description:"Clears up to 100 messages in the current channel."},{id:"kick",aliases:["kick","k"],channel:"guild",ownerOnly:false,usage:"<@some Guy> Your behaviour is harmful.",userPermissions:"KickMembers",description:"Kicks a user by ID or name with an optional message."},{id:"savechat",aliases:["savechat"],channel:"guild",ownerOnly:false,usage:"100",userPermissions:"ManageMessages",description:"Saves a number of messages, and sends it to you."}]],["NSFW",[{id:"e621",aliases:["e621"],ownerOnly:false,userPermissions:"",description:"e621 :hahaa:"},{id:"ero",aliases:["ero"],ownerOnly:false,usage:[""],userPermissions:"",description:"Returns a nsfw ero picture"},{id:"hentai",aliases:["hentai"],ownerOnly:false,userPermissions:"",description:"Fetches hentai images from Booru boards"},{id:"hentaibomb",aliases:["hentaibomb","hb"],ownerOnly:false,usage:["waifu","neko","femboy","blowjob"],userPermissions:"",description:"Posts 5 NSFW images, using the waifu.pics API"},{id:"hentainuke",aliases:["hentainuke","hn"],ownerOnly:false,usage:["waifu","neko","femboy","blowjob"],userPermissions:"",description:"Posts 30 NSFW images, using the waifu.pics API"}]],["Owner only",[{id:"botconfig",aliases:["botconfig","bc"],ownerOnly:true,usage:["<setting> <value>","currencyname Europe Dollars"],userPermissions:"",description:"Change various bot configurations. Run without arguments to see current settings."},{id:"dailyreset",aliases:["dailyreset","resetdaily"],ownerOnly:true,usage:"",userPermissions:"",description:"Resets daily claims that have been made"},{id:"deregister",aliases:["deregister","dereg"],ownerOnly:true,userPermissions:"",description:"Deregister a command, until bot restarts."},{id:"die",aliases:["die","kill","shutdown"],ownerOnly:true,userPermissions:"",description:"Shuts down bot."},{id:"emit",aliases:["emit"],ownerOnly:true,usage:"ratelimit <info about event>",userPermissions:"",description:"Emits a specified event."},{id:"eval",aliases:["eval"],ownerOnly:true,userPermissions:"",description:""},{id:"exec",aliases:["exec"],ownerOnly:true,userPermissions:"",description:""},{id:"gencmdlist",aliases:["gencmdlist","gencmdlst"],ownerOnly:true,usage:"",userPermissions:"",description:"Uploads a JSON file containing all commands."},{id:"reload",aliases:["re","reload"],ownerOnly:true,userPermissions:"",description:"Reloads a command.."},{id:"setactivity",aliases:["setactivity","setac"],ownerOnly:true,usage:["<type> <Activity>","playing with Dreb"],userPermissions:"",description:"Set the bot's activity."},{id:"setavatar",aliases:["setavatar","setav"],ownerOnly:true,usage:"https://discord.com/media/1231231231231312321/1231231312323132.png",userPermissions:"",description:"Assigns the bot a new avatar."},{id:"setdaily",aliases:["setdaily","dailyset"],ownerOnly:true,usage:"",userPermissions:"",description:"Sets the daily currency allowance amount. Set to 0 to disable."},{id:"setname",aliases:["setname"],ownerOnly:true,usage:"Medusa",userPermissions:"",description:"Assigns the bot a new name/username."},{id:"sqlexec",aliases:["sqlexec"],ownerOnly:true,usage:"UPDATE DiscordUsers SET amount=amount+69420",userPermissions:"",description:"Executes sql queries and returns the number of affected rows. Dangerous."},{id:"sqlselect",aliases:["sqlselect"],ownerOnly:true,usage:"SELECT * FROM DiscordUsers LIMIT 5",userPermissions:"",description:"Executes sql queries and returns the number of affected rows. Dangerous."},{id:"update",aliases:["update"],ownerOnly:true,userPermissions:"",description:""}]],["Roles",[{id:"rolecolor",aliases:["rolecolor","roleclr","rclr"],channel:"guild",ownerOnly:false,usage:"@Gamer ff00ff",userPermissions:"",description:"Sets or displays the color of a given role, or your highest role."},{id:"rolecreate",aliases:["rolecreate","createrole","rc","cr"],channel:"guild",ownerOnly:false,usage:"GAMERS",userPermissions:"ManageRoles",description:"Creates a role with a given name."},{id:"roledelete",aliases:["roledelete","deleterole","dr"],channel:"guild",ownerOnly:false,usage:"@gamers @streamers @weebs",userPermissions:"ManageRoles",description:"Deletes one or more roles"},{id:"rolehoist",aliases:["rolehoist","hoistrole","hoist"],channel:"guild",ownerOnly:false,usage:"@gamers",userPermissions:"ManageRoles",description:"Hoists or unhoists a role"},{id:"roleinfo",aliases:["roleinfo","role","rinfo"],channel:"guild",ownerOnly:false,usage:"@Gamers",userPermissions:"",description:"Shows info about a given role. If no role is supplied, it defaults to current one."},{id:"inrole",aliases:["inrole"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"",description:"Lists all users in role"},{id:"rolelist",aliases:["rolelist","roles"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"",description:"Lists all roles"},{id:"listuserroles",aliases:["listuserroles","lur"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"",description:"List all custom assigned roles."},{id:"rolementionable",aliases:["rolementionable","rolem","mentionable"],channel:"guild",ownerOnly:false,usage:"@gamers",userPermissions:"ManageRoles",description:"Toggles if a role is mentionable"},{id:"myrole",aliases:["myrole","mr"],channel:"guild",ownerOnly:false,usage:["color FF0000","name Dreb","icon :someEmoji:","icon reset"],userPermissions:"",description:"Checks your assigned user role. Can set role color, name and icon."},{id:"roleremove",aliases:["roleremove","removerole","rr"],channel:"guild",ownerOnly:false,usage:"@Dreb Gamer",userPermissions:"ManageRoles",description:"Takes away a user's role. The role you specify has to be lower in the role hierarchy than your highest role."},{id:"rolerename",aliases:["rolerename","rolename","rn"],channel:"guild",ownerOnly:false,usage:"@Gamer weeb",userPermissions:"ManageRoles",description:"Renames a given role. The role you specify has to be lower in the role hierarchy than your highest role. Use 'quotes around rolename with spaces'."},{id:"restore",aliases:["restore"],channel:"guild",ownerOnly:false,usage:"@dreb",userPermissions:"Administrator",description:"Restores roles for a user who has previously left the server."},{id:"setrole",aliases:["setrole","sr"],channel:"guild",ownerOnly:false,usage:"@Dreb Gamer",userPermissions:"ManageRoles",description:"Gives a role to a user. The role you specify has to be lower in the role hierarchy than your highest role."},{id:"setuserrole",aliases:["setuserrole","sur"],channel:"guild",ownerOnly:false,usage:"@Platinum [role]",userPermissions:"ManageRoles",description:"Assigns a role to a user. Provide the command again to remove the role."}]],["Server settings",[{id:"addemotereact",aliases:["addemotereact","emotereact","aer"],channel:"guild",ownerOnly:false,usage:["red :red:","anime :weeaboosgetout:"],userPermissions:"ManageEmojisAndStickers",description:"Add triggers for the bot to react with emojis/emotes to. Use quotes for triggers with spaces."},{id:"config",aliases:["config","configure","conf"],channel:"guild",ownerOnly:false,usage:["","dadbot enable","anniversary enable","prefix !","okcolor <hex>","errorcolor <hex>"],userPermissions:"ManageMessages",description:"Configure or display guild specific settings. Will always respond to default prefix regardless of server prefix."},{id:"excludechannel",aliases:["excludechannel","excludechnl","echnl"],channel:"guild",ownerOnly:false,usage:["","#channel"],userPermissions:"ManageChannels",description:"Exclude or include a channel from dadbot. Provide no parameter to show a list of excluded channels. "},{id:"excludestickyroles",aliases:["excludestickyroles","estickyroles","estickyrole","esrole"],channel:"guild",ownerOnly:false,usage:["","@excludedRole @anotherRole"],userPermissions:"ManageGuild",description:"Exclude or include a role from stickyroles. Provide no parameter to show a list of excluded roles.\nIf someone who had one or more excluded roles, re-joins this server, they wont get any excluded roles."},{id:"goodbye",aliases:["goodbyetoggle","goodbye","byetoggle","bye"],channel:"guild",ownerOnly:false,usage:["","#leave-channel"],userPermissions:"ManageGuild",description:"Toggles leave messages. Bot defaults to current channel if no channel is provided."},{id:"goodbyedelete",aliases:["goodbyedelete","goodbyedel","byedel"],channel:"guild",ownerOnly:false,usage:["10"],userPermissions:"ManageGuild",description:"Set the time, in seconds, it takes for goodbye messages to be deleted by the bot. Set to 0 to disable."},{id:"goodbyemessage",aliases:["goodbyemessage","goodbyemsg","byemsg"],channel:"guild",ownerOnly:false,userPermissions:"ManageGuild",description:"Set message to display when someone leaves the guild. Provide either text, or valid JSON from the [embed creator](https://embed.kaikibot.xyz)"},{id:"goodbyetest",aliases:["goodbyetest","byetest"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"ManageGuild",description:"Tests goodbye message as it would appear when triggered."},{id:"listreacts",aliases:["listreacts","ler"],channel:"guild",ownerOnly:false,usage:[""],userPermissions:"",description:"List emotereact triggers."},{id:"removereact",aliases:["removereact","rer"],channel:"guild",ownerOnly:false,usage:["anime"],userPermissions:"ManageEmojisAndStickers",description:"Remove emotereact triggers."},{id:"stickyroles",aliases:["stickyroles","sticky"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"Administrator",description:"Toggles whether bot will give all roles back when someone re-joins the server"},{id:"togglecategory",aliases:["togglecategory","tc"],channel:"guild",ownerOnly:false,usage:"Anime",userPermissions:"Administrator",description:"Toggles a category"},{id:"welcometoggle",aliases:["welcometoggle","welcome"],channel:"guild",ownerOnly:false,usage:["","#welcome-channel"],userPermissions:"ManageGuild",description:"Toggles welcome messages. Bot defaults to current channel if no channel is provided."},{id:"welcomedelete",aliases:["welcomedelete","welcomedel"],channel:"guild",ownerOnly:false,usage:["10"],userPermissions:"ManageGuild",description:"Set the time it takes for welcome messages to be deleted by the bot"},{id:"welcomemessage",aliases:["welcomemessage","welcomemsg"],channel:"guild",ownerOnly:false,userPermissions:"ManageGuild",description:"Set message to display when someone joins the guild. Provide either text, or valid JSON from the [embed creator](https://embed.kaikibot.xyz)"},{id:"welcometest",aliases:["welcometest"],channel:"guild",ownerOnly:false,usage:"",userPermissions:"ManageGuild",description:"Tests welcome message as it would appear for new members."}]],["Utility",[{id:"avatar",aliases:["avatar","av"],ownerOnly:false,usage:"@dreb",userPermissions:"",description:"Shows a mentioned person's avatar."},{id:"checkpermissions",aliases:["checkperms","cp","perms"],channel:"guild",ownerOnly:false,usage:["","@user","@role","@user #channel"],userPermissions:"",description:"Lists perms for role/member"},{id:"cmdlist",aliases:["commands","cmds","cmdlist"],ownerOnly:false,usage:["","admin"],userPermissions:"",description:"Shows categories, or commands if provided with a category."},{id:"color",aliases:["color","clr"],ownerOnly:false,usage:["#ff00ff","list"],userPermissions:"",description:"Returns a representation of a color string, or shows list of available color names to use."},{id:"colorlist",aliases:["colorlist","colors","clrs"],ownerOnly:false,usage:"",userPermissions:"",description:"Shows a list of all supported color names for the bot"},{id:"exclude",aliases:["exclude","e","excl"],channel:"guild",ownerOnly:false,userPermissions:"",description:"Excludes you from being targeted by dad-bot. Execute command again to reverse this action."},{id:"fetch",aliases:["fu","fetch"],ownerOnly:false,usage:"<id>",userPermissions:"",description:"Fetches a discord user, shows relevant information. 30sec cooldown."},{id:"forgetme",aliases:["forgetme"],ownerOnly:false,usage:"",userPermissions:"",description:"Deletes all information about you in the database"},{id:"google",aliases:["google","search","g"],ownerOnly:false,usage:"bing",userPermissions:"",description:"Search google for something ."},{id:"help",aliases:["help","h"],ownerOnly:false,usage:"ping",userPermissions:"",description:"Shows command info"},{id:"info",aliases:["info"],channel:"guild",ownerOnly:false,usage:["#channel","@member","@role",":coolCustomEmoji:","messageID"],userPermissions:"",description:"Returns info on a channel, role, member, emoji, or message"},{id:"invite",aliases:["invite","inv"],ownerOnly:false,usage:"",userPermissions:"",description:"Get a link to invite the bot to your server."},{id:"mcping",aliases:["mcping"],ownerOnly:false,usage:"",userPermissions:"",description:""},{id:"ping",aliases:["p","ping"],ownerOnly:false,userPermissions:"",description:"Ping the bot and websocket to see if there are latency issues."},{id:"random",aliases:["random","rng"],ownerOnly:false,usage:["1 10","25"],userPermissions:"",description:"Sends a random number between your two inputs."},{id:"say",aliases:["say"],channel:"guild",ownerOnly:false,usage:["#general hello from another channel","<embed code>"],userPermissions:"ManageMessages",description:"Bot will send the message you typed in the specified channel. It also takes embeds"},{id:"serverinfo",aliases:["serverinfo","sinfo"],ownerOnly:false,userPermissions:"",description:"Shows information about the current server."},{id:"serverlist",aliases:["serverlist","listservers"],ownerOnly:false,usage:["","7"],userPermissions:"",description:"Lists all servers the bot is in. 15 servers per page."},{id:"shardstats",aliases:["shards","shardstats"],channel:"guild",ownerOnly:false,userPermissions:"",description:"Displays the states of all shards"},{id:"stats",aliases:["stats"],ownerOnly:false,userPermissions:"",description:"Statistics and information"},{id:"todo",aliases:["todo","note"],ownerOnly:false,userPermissions:"",description:"A personal todo list. The items are limited to 204 characters. Intended for small notes."},{id:"urbandict",aliases:["urbandict","urban","ud"],ownerOnly:false,usage:["Watermelon","anime"],userPermissions:"",description:"Searches Urban Dictionary for a word or sentence"}]]];

	var commands = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': cmdlist
	});

	// @ts-ignore
	const cats = Object.entries(cmdlist);
	function search(input, category) {
	    var _a, _b, _c;
	    /**
	     * Get input value in both firefox and chrome
	     */
	    const inputText = (_c = (_b = (_a = (input.originalTarget || input.target)) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim();
	    let mapped = cats.map((cm) => cm[1]);
	    // Filter based on enabled category??
	    if (Object.keys(category).length) {
	        const cat = Object.keys(category).shift();
	        mapped = mapped.filter((a) => a[0] === cat);
	    }
	    const filtered = mapped
	        .map((cb) => cb[1])
	        .flat()
	        .filter((a) => a.id.toLowerCase().includes(inputText || ""));
	    return filtered
	        .map((res, i) => {
	        const cat = cats
	            .map((a) => a[1])
	            .find((a) => a[1].find((b) => b.id === res.id));
	        if (!cat || !cat[0])
	            return;
	        return [cats.findIndex((a) => a[0] === cat[0]), [cat[0], [res]]];
	    })
	        .filter(Boolean);
	}

	/* src/components/Commands.svelte generated by Svelte v4.2.8 */

	const { Object: Object_1$1 } = globals;
	const file$3 = "src/components/Commands.svelte";

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[12] = list[i];
		return child_ctx;
	}

	function get_each_context_1(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[15] = list[i];
		return child_ctx;
	}

	function get_each_context_2(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[18] = list[i];
		return child_ctx;
	}

	function get_each_context_3(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[21] = list[i];
		return child_ctx;
	}

	function get_each_context_4(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[12] = list[i];
		const constants_0 = /*category*/ child_ctx[12][0];
		child_ctx[24] = constants_0;
		return child_ctx;
	}

	// (84:6) {#if typeof cat === "string"}
	function create_if_block_2(ctx) {
		let div;
		let t_value = /*cat*/ ctx[24] + "";
		let t;
		let div_class_value;
		let mounted;
		let dispose;

		function click_handler() {
			return /*click_handler*/ ctx[10](/*cat*/ ctx[24]);
		}

		const block = {
			c: function create() {
				div = element("div");
				t = text(t_value);

				attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*active*/ ctx[0][/*cat*/ ctx[24]]
				? "cmdCategoryActive"
				: "cmdCategory") + " svelte-1q550sk"));

				add_location(div, file$3, 92, 6, 3085);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div, anchor);
				append_dev(div, t);

				if (!mounted) {
					dispose = listen_dev(div, "click", click_handler, false, false, false, false);
					mounted = true;
				}
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;

				if (dirty & /*active*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*active*/ ctx[0][/*cat*/ ctx[24]]
				? "cmdCategoryActive"
				: "cmdCategory") + " svelte-1q550sk"))) {
					attr_dev(div, "class", div_class_value);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div);
				}

				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_2.name,
			type: "if",
			source: "(84:6) {#if typeof cat === \\\"string\\\"}",
			ctx
		});

		return block;
	}

	// (82:4) {#each categories[1] as category}
	function create_each_block_4(ctx) {
		let if_block_anchor;
		let if_block = typeof /*cat*/ ctx[24] === "string" && create_if_block_2(ctx);

		const block = {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (typeof /*cat*/ ctx[24] === "string") if_block.p(ctx, dirty);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_4.name,
			type: "each",
			source: "(82:4) {#each categories[1] as category}",
			ctx
		});

		return block;
	}

	// (81:2) {#each Object.entries(commands) as categories}
	function create_each_block_3(ctx) {
		let each_1_anchor;
		let each_value_4 = ensure_array_like_dev(/*categories*/ ctx[21][1]);
		let each_blocks = [];

		for (let i = 0; i < each_value_4.length; i += 1) {
			each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
		}

		const block = {
			c: function create() {
				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*active, Object, manageCategories*/ 65) {
					each_value_4 = ensure_array_like_dev(/*categories*/ ctx[21][1]);
					let i;

					for (i = 0; i < each_value_4.length; i += 1) {
						const child_ctx = get_each_context_4(ctx, each_value_4, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block_4(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value_4.length;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(each_1_anchor);
				}

				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_3.name,
			type: "each",
			source: "(81:2) {#each Object.entries(commands) as categories}",
			ctx
		});

		return block;
	}

	// (109:6) {#if group.length}
	function create_if_block(ctx) {
		let if_block_anchor;
		let if_block = typeof /*group*/ ctx[15] !== "string" && create_if_block_1(ctx);

		const block = {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (typeof /*group*/ ctx[15] !== "string") {
					if (if_block) {
						if_block.p(ctx, dirty);
					} else {
						if_block = create_if_block_1(ctx);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block.name,
			type: "if",
			source: "(109:6) {#if group.length}",
			ctx
		});

		return block;
	}

	// (110:6) {#if typeof group !== "string"}
	function create_if_block_1(ctx) {
		let each_1_anchor;
		let each_value_2 = ensure_array_like_dev(/*group*/ ctx[15]);
		let each_blocks = [];

		for (let i = 0; i < each_value_2.length; i += 1) {
			each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
		}

		const block = {
			c: function create() {
				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*Array, cats*/ 4) {
					each_value_2 = ensure_array_like_dev(/*group*/ ctx[15]);
					let i;

					for (i = 0; i < each_value_2.length; i += 1) {
						const child_ctx = get_each_context_2(ctx, each_value_2, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block_2(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value_2.length;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(each_1_anchor);
				}

				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_1.name,
			type: "if",
			source: "(110:6) {#if typeof group !== \\\"string\\\"}",
			ctx
		});

		return block;
	}

	// (111:8) {#each group as cmd}
	function create_each_block_2(ctx) {
		let div3;
		let div0;
		let t0;
		let t1_value = /*cmd*/ ctx[18].id + "";
		let t1;
		let t2;
		let p0;
		let t3_value = /*category*/ ctx[12][1][0] + "";
		let t3;
		let t4;
		let div1;
		let p1;
		let t5_value = /*cmd*/ ctx[18].description + "";
		let t5;
		let t6;
		let div2;
		let p2;
		let t7;
		let t8_value = /*cmd*/ ctx[18].id + "";
		let t8;
		let t9;

		let t10_value = (Array.isArray(/*cmd*/ ctx[18].usage)
		? /*cmd*/ ctx[18].usage.join(`\n+${/*cmd*/ ctx[18].id} `)
		: /*cmd*/ ctx[18].usage || "") + "";

		let t10;
		let t11;

		const block = {
			c: function create() {
				div3 = element("div");
				div0 = element("div");
				t0 = text("+");
				t1 = text(t1_value);
				t2 = space();
				p0 = element("p");
				t3 = text(t3_value);
				t4 = space();
				div1 = element("div");
				p1 = element("p");
				t5 = text(t5_value);
				t6 = space();
				div2 = element("div");
				p2 = element("p");
				t7 = text("+");
				t8 = text(t8_value);
				t9 = space();
				t10 = text(t10_value);
				t11 = space();
				attr_dev(p0, "class", "categoryTxt svelte-1q550sk");
				add_location(p0, file$3, 122, 14, 3869);
				attr_dev(div0, "class", "cmd svelte-1q550sk");
				add_location(div0, file$3, 120, 12, 3813);
				attr_dev(p1, "class", "description svelte-1q550sk");
				add_location(p1, file$3, 127, 14, 4012);
				attr_dev(div1, "class", "cmdDesc svelte-1q550sk");
				add_location(div1, file$3, 126, 12, 3976);
				attr_dev(p2, "class", "description svelte-1q550sk");
				add_location(p2, file$3, 132, 14, 4157);
				attr_dev(div2, "class", "cmdUsage svelte-1q550sk");
				add_location(div2, file$3, 131, 12, 4120);
				attr_dev(div3, "class", "m-auto flex mb-1 cmdContainer svelte-1q550sk");
				add_location(div3, file$3, 119, 10, 3757);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div3, anchor);
				append_dev(div3, div0);
				append_dev(div0, t0);
				append_dev(div0, t1);
				append_dev(div0, t2);
				append_dev(div0, p0);
				append_dev(p0, t3);
				append_dev(div3, t4);
				append_dev(div3, div1);
				append_dev(div1, p1);
				append_dev(p1, t5);
				append_dev(div3, t6);
				append_dev(div3, div2);
				append_dev(div2, p2);
				append_dev(p2, t7);
				append_dev(p2, t8);
				append_dev(p2, t9);
				append_dev(p2, t10);
				append_dev(div3, t11);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*cats*/ 4 && t1_value !== (t1_value = /*cmd*/ ctx[18].id + "")) set_data_dev(t1, t1_value);
				if (dirty & /*cats*/ 4 && t3_value !== (t3_value = /*category*/ ctx[12][1][0] + "")) set_data_dev(t3, t3_value);
				if (dirty & /*cats*/ 4 && t5_value !== (t5_value = /*cmd*/ ctx[18].description + "")) set_data_dev(t5, t5_value);
				if (dirty & /*cats*/ 4 && t8_value !== (t8_value = /*cmd*/ ctx[18].id + "")) set_data_dev(t8, t8_value);

				if (dirty & /*cats*/ 4 && t10_value !== (t10_value = (Array.isArray(/*cmd*/ ctx[18].usage)
				? /*cmd*/ ctx[18].usage.join(`\n+${/*cmd*/ ctx[18].id} `)
				: /*cmd*/ ctx[18].usage || "") + "")) set_data_dev(t10, t10_value);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div3);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_2.name,
			type: "each",
			source: "(111:8) {#each group as cmd}",
			ctx
		});

		return block;
	}

	// (108:4) {#each category[1] as group}
	function create_each_block_1(ctx) {
		let if_block_anchor;
		let if_block = /*group*/ ctx[15].length && create_if_block(ctx);

		const block = {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (/*group*/ ctx[15].length) {
					if (if_block) {
						if_block.p(ctx, dirty);
					} else {
						if_block = create_if_block(ctx);
						if_block.c();
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_1.name,
			type: "each",
			source: "(108:4) {#each category[1] as group}",
			ctx
		});

		return block;
	}

	// (107:2) {#each cats as category}
	function create_each_block(ctx) {
		let each_1_anchor;
		let each_value_1 = ensure_array_like_dev(/*category*/ ctx[12][1]);
		let each_blocks = [];

		for (let i = 0; i < each_value_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
		}

		const block = {
			c: function create() {
				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*cats, Array*/ 4) {
					each_value_1 = ensure_array_like_dev(/*category*/ ctx[12][1]);
					let i;

					for (i = 0; i < each_value_1.length; i += 1) {
						const child_ctx = get_each_context_1(ctx, each_value_1, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block_1(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value_1.length;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(each_1_anchor);
				}

				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block.name,
			type: "each",
			source: "(107:2) {#each cats as category}",
			ctx
		});

		return block;
	}

	function create_fragment$3(ctx) {
		let div8;
		let div3;
		let div2;
		let input;
		let t0;
		let div0;
		let t1;
		let div1;
		let button;
		let svg;
		let path;
		let t2;
		let t3;
		let div7;
		let div4;
		let h20;
		let t5;
		let div5;
		let h21;
		let t7;
		let div6;
		let h22;
		let t9;
		let mounted;
		let dispose;
		let each_value_3 = ensure_array_like_dev(Object.entries(commands));
		let each_blocks_1 = [];

		for (let i = 0; i < each_value_3.length; i += 1) {
			each_blocks_1[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
		}

		let each_value = ensure_array_like_dev(/*cats*/ ctx[2]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				div8 = element("div");
				div3 = element("div");
				div2 = element("div");
				input = element("input");
				t0 = space();
				div0 = element("div");
				t1 = space();
				div1 = element("div");
				button = element("button");
				svg = svg_element("svg");
				path = svg_element("path");
				t2 = space();

				for (let i = 0; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].c();
				}

				t3 = space();
				div7 = element("div");
				div4 = element("div");
				h20 = element("h2");
				h20.textContent = "Command";
				t5 = space();
				div5 = element("div");
				h21 = element("h2");
				h21.textContent = "Description";
				t7 = space();
				div6 = element("div");
				h22 = element("h2");
				h22.textContent = "Usage";
				t9 = space();

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr_dev(input, "class", "inputSearchbar svelte-1q550sk");
				attr_dev(input, "type", "text");
				attr_dev(input, "id", "searchbar2");
				attr_dev(input, "placeholder", "Search commands");
				add_location(input, file$3, 57, 6, 1540);
				attr_dev(div0, "class", "searchThingy svelte-1q550sk");
				add_location(div0, file$3, 68, 6, 1906);
				attr_dev(path, "d", "M5.00038 1C2.79103 1 1 2.7909 1 5.00008C1 7.20927 2.79103 9.00017 5.00038 9.00017C5.92463 9.00017 6.77568 8.68675 7.45302 8.1604L10.1464 10.8536C10.3416 11.0488 10.6583 11.0488 10.8535 10.8536C11.0488 10.6583 11.0488 10.3417 10.8535 10.1464L8.16028 7.45337C8.68705 6.77595 9.00075 5.92465 9.00075 5.00008C9.00075 2.7909 7.20972 1 5.00038 1ZM2.00009 5.00008C2.00009 3.34319 3.34337 2.00002 5.00038 2.00002C6.65739 2.00002 8.00066 3.34319 8.00066 5.00008C8.00066 6.65697 6.65739 8.00015 5.00038 8.00015C3.34337 8.00015 2.00009 6.65697 2.00009 5.00008Z");
				attr_dev(path, "fill", "currentColor");
				attr_dev(path, "class", "svelte-1q550sk");
				add_location(path, file$3, 78, 12, 2231);
				attr_dev(svg, "aria-hidden", "true");
				attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
				attr_dev(svg, "width", "12");
				attr_dev(svg, "height", "12");
				attr_dev(svg, "viewBox", "0 0 12 12");
				attr_dev(svg, "class", "svelte-1q550sk");
				add_location(svg, file$3, 71, 10, 2045);
				attr_dev(button, "class", "searchButton svelte-1q550sk");
				attr_dev(button, "id", "searchbar3");
				button.disabled = true;
				add_location(button, file$3, 70, 8, 1980);
				attr_dev(div1, "class", "searchBottom svelte-1q550sk");
				add_location(div1, file$3, 69, 6, 1945);
				attr_dev(div2, "class", "searchbar svelte-1q550sk");
				attr_dev(div2, "id", "searchbar1");
				add_location(div2, file$3, 56, 4, 1494);
				attr_dev(div3, "class", "mb-10 svelte-1q550sk");
				add_location(div3, file$3, 55, 2, 1470);
				attr_dev(h20, "class", "description text-2xl svelte-1q550sk");
				add_location(h20, file$3, 104, 6, 3347);
				attr_dev(div4, "class", "cmd svelte-1q550sk");
				add_location(div4, file$3, 103, 4, 3323);
				attr_dev(h21, "class", "description text-2xl svelte-1q550sk");
				add_location(h21, file$3, 107, 6, 3436);
				attr_dev(div5, "class", "cmdDesc svelte-1q550sk");
				add_location(div5, file$3, 106, 4, 3408);
				attr_dev(h22, "class", "description text-2xl svelte-1q550sk");
				add_location(h22, file$3, 110, 6, 3530);
				attr_dev(div6, "class", "cmdUsage svelte-1q550sk");
				add_location(div6, file$3, 109, 4, 3501);
				attr_dev(div7, "class", "w-full m-auto mt-10 mb-5 flex svelte-1q550sk");
				add_location(div7, file$3, 102, 2, 3275);
				attr_dev(div8, "class", "w-10/12 text-gray-300 m-auto mt-10 mb-52 flow-root svelte-1q550sk");
				add_location(div8, file$3, 54, 0, 1403);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div8, anchor);
				append_dev(div8, div3);
				append_dev(div3, div2);
				append_dev(div2, input);
				append_dev(div2, t0);
				append_dev(div2, div0);
				append_dev(div2, t1);
				append_dev(div2, div1);
				append_dev(div1, button);
				append_dev(button, svg);
				append_dev(svg, path);
				append_dev(div8, t2);

				for (let i = 0; i < each_blocks_1.length; i += 1) {
					if (each_blocks_1[i]) {
						each_blocks_1[i].m(div8, null);
					}
				}

				append_dev(div8, t3);
				append_dev(div8, div7);
				append_dev(div7, div4);
				append_dev(div4, h20);
				append_dev(div7, t5);
				append_dev(div7, div5);
				append_dev(div5, h21);
				append_dev(div7, t7);
				append_dev(div7, div6);
				append_dev(div6, h22);
				append_dev(div8, t9);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(div8, null);
					}
				}

				if (!mounted) {
					dispose = [
						listen_dev(input, "input", /*input_handler*/ ctx[7], false, false, false, false),
						listen_dev(input, "reset", /*resetCats*/ ctx[4], false, false, false, false),
						listen_dev(input, "abort", /*resetCats*/ ctx[4], false, false, false, false),
						listen_dev(input, "focus", /*focus_handler*/ ctx[8], false, false, false, false),
						listen_dev(input, "focusout", /*focusout_handler*/ ctx[9], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*Object, active, manageCategories*/ 65) {
					each_value_3 = ensure_array_like_dev(Object.entries(commands));
					let i;

					for (i = 0; i < each_value_3.length; i += 1) {
						const child_ctx = get_each_context_3(ctx, each_value_3, i);

						if (each_blocks_1[i]) {
							each_blocks_1[i].p(child_ctx, dirty);
						} else {
							each_blocks_1[i] = create_each_block_3(child_ctx);
							each_blocks_1[i].c();
							each_blocks_1[i].m(div8, t3);
						}
					}

					for (; i < each_blocks_1.length; i += 1) {
						each_blocks_1[i].d(1);
					}

					each_blocks_1.length = each_value_3.length;
				}

				if (dirty & /*cats, Array*/ 4) {
					each_value = ensure_array_like_dev(/*cats*/ ctx[2]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div8, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div8);
				}

				destroy_each(each_blocks_1, detaching);
				destroy_each(each_blocks, detaching);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Commands', slots, []);
		let active = {};
		let originalColor;
		let cats = Object.entries(cmdlist);
		let classes = ["searchbar", "inputSearchbar"];

		function searchbarOnInput(c, category) {
			$$invalidate(2, cats = search(c, category));
		}

		function resetCats() {
			$$invalidate(2, cats = Object.entries(cmdlist));
			$$invalidate(0, active = {});
		}

		function colorSearchbar(color) {
			const searchBar = document.getElementById("searchbar1");
			$$invalidate(1, originalColor = searchBar.style.backgroundColor);
			searchBar.style.backgroundColor = color;

			if (searchBar.style.boxShadow) {
				searchBar.style.boxShadow = null;
			} else {
				searchBar.style.boxShadow = "0 2px var(--accent4)";
			}

			["searchbar2", "searchbar3"].forEach(name => {
				document.getElementById(name).style.backgroundColor = color;
			});
		}

		function manageCategories(categoryElement) {
			if (active[categoryElement]) {
				if (Object.keys(active).length !== 1) {
					resetCats();
				}

				$$invalidate(0, active[categoryElement] = !active[categoryElement], active);
				resetCats();
			} else {
				$$invalidate(0, active[categoryElement] = !active[categoryElement], active);
				$$invalidate(2, cats = cats.filter(a => a[1][0] === categoryElement));

				if (Object.keys(active).length !== 1) {
					resetCats();
				}
			}
		}

		const writable_props = [];

		Object_1$1.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Commands> was created with unknown prop '${key}'`);
		});

		const input_handler = c => searchbarOnInput(c, (() => active)());
		const focus_handler = () => colorSearchbar("#252422");
		const focusout_handler = () => colorSearchbar(originalColor);
		const click_handler = cat => manageCategories(cat);

		$$self.$capture_state = () => ({
			commands,
			search,
			active,
			originalColor,
			cats,
			classes,
			searchbarOnInput,
			resetCats,
			colorSearchbar,
			manageCategories
		});

		$$self.$inject_state = $$props => {
			if ('active' in $$props) $$invalidate(0, active = $$props.active);
			if ('originalColor' in $$props) $$invalidate(1, originalColor = $$props.originalColor);
			if ('cats' in $$props) $$invalidate(2, cats = $$props.cats);
			if ('classes' in $$props) classes = $$props.classes;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [
			active,
			originalColor,
			cats,
			searchbarOnInput,
			resetCats,
			colorSearchbar,
			manageCategories,
			input_handler,
			focus_handler,
			focusout_handler,
			click_handler
		];
	}

	class Commands extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Commands",
				options,
				id: create_fragment$3.name
			});
		}
	}

	/* src/components/Placeholders.svelte generated by Svelte v4.2.8 */
	const file$2 = "src/components/Placeholders.svelte";

	function create_fragment$2(ctx) {
		let img;
		let img_src_value;

		const block = {
			c: function create() {
				img = element("img");
				attr_dev(img, "class", "svg-class svelte-is7uri");
				if (!src_url_equal(img.src, img_src_value = /*url*/ ctx[0])) attr_dev(img, "src", img_src_value);
				add_location(img, file$2, 4, 0, 45);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, img, anchor);
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*url*/ 1 && !src_url_equal(img.src, img_src_value = /*url*/ ctx[0])) {
					attr_dev(img, "src", img_src_value);
				}
			},
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(img);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Placeholders', slots, []);
		let { url } = $$props;

		$$self.$$.on_mount.push(function () {
			if (url === undefined && !('url' in $$props || $$self.$$.bound[$$self.$$.props['url']])) {
				console.warn("<Placeholders> was created without expected prop 'url'");
			}
		});

		const writable_props = ['url'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Placeholders> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('url' in $$props) $$invalidate(0, url = $$props.url);
		};

		$$self.$capture_state = () => ({ url });

		$$self.$inject_state = $$props => {
			if ('url' in $$props) $$invalidate(0, url = $$props.url);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [url];
	}

	class Placeholders extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, { url: 0 });

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Placeholders",
				options,
				id: create_fragment$2.name
			});
		}

		get url() {
			throw new Error("<Placeholders>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set url(value) {
			throw new Error("<Placeholders>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/components/OrangeBar.svelte generated by Svelte v4.2.8 */
	const file$1 = "src/components/OrangeBar.svelte";

	function create_fragment$1(ctx) {
		let svg;
		let rect;

		const block = {
			c: function create() {
				svg = svg_element("svg");
				rect = svg_element("rect");
				attr_dev(rect, "stroke-width", "0.5");
				attr_dev(rect, "stroke", "var(--accent4)");
				attr_dev(rect, "width", "100%");
				attr_dev(rect, "height", "7px");
				attr_dev(rect, "ry", "2%");
				attr_dev(rect, "fill", "var(--accent4)");
				add_location(rect, file$1, 0, 36, 36);
				attr_dev(svg, "width", "100%");
				attr_dev(svg, "height", "100%");
				add_location(svg, file$1, 0, 4, 4);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, svg, anchor);
				append_dev(svg, rect);
			},
			p: noop,
			i: noop,
			o: noop,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(svg);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('OrangeBar', slots, []);
		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<OrangeBar> was created with unknown prop '${key}'`);
		});

		return [];
	}

	class OrangeBar extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "OrangeBar",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src/routes/+page.svelte generated by Svelte v4.2.8 */

	const { Object: Object_1 } = globals;
	const file = "src/routes/+page.svelte";

	function create_fragment(ctx) {
		let main;
		let h1;
		let t1;
		let h20;
		let t2;
		let mark0;
		let t4;
		let em;
		let t6;
		let t7;
		let div0;
		let a0;
		let button0;
		let t9;
		let button1;
		let t11;
		let a1;
		let button2;
		let t13;
		let a2;
		let button3;
		let t15;
		let a3;
		let button4;
		let t17;
		let a4;
		let button5;
		let t19;
		let a5;
		let button6;
		let t21;
		let div15;
		let div3;
		let div1;
		let h30;
		let t22;
		let mark1;
		let t24;
		let t25;
		let h40;
		let t27;
		let orangebar0;
		let t28;
		let div2;
		let placeholders0;
		let t29;
		let div6;
		let div4;
		let h31;
		let t31;
		let h41;
		let t33;
		let orangebar1;
		let t34;
		let div5;
		let placeholders1;
		let t35;
		let div9;
		let div7;
		let h32;
		let t37;
		let h42;
		let t39;
		let orangebar2;
		let t40;
		let div8;
		let placeholders2;
		let t41;
		let div12;
		let div10;
		let h33;
		let t43;
		let h43;
		let t45;
		let orangebar3;
		let t46;
		let div11;
		let placeholders3;
		let t47;
		let div13;
		let h34;
		let t49;
		let h44;
		let t51;
		let div14;
		let h35;
		let t53;
		let h45;
		let t54;
		let br;
		let t55;
		let t56;
		let div16;
		let commands;
		let t57;
		let div20;
		let div17;
		let h21;
		let t59;
		let h36;
		let a6;
		let t60;
		let t61;
		let h37;
		let a7;
		let t63;
		let div18;
		let h22;
		let t65;
		let h38;
		let a8;
		let t66;
		let t67;
		let h39;
		let a9;
		let t68;
		let t69;
		let div19;
		let h23;
		let t71;
		let h310;
		let a10;
		let t72;
		let t73;
		let h311;
		let a11;
		let t74;
		let t75;
		let footer;
		let div21;
		let h312;
		let a12;
		let t76;
		let t77;
		let div22;
		let h313;
		let t79;
		let div23;
		let h314;
		let a13;
		let t80;
		let current;
		let mounted;
		let dispose;
		orangebar0 = new OrangeBar({ $$inline: true });

		placeholders0 = new Placeholders({
				props: {
					url: "https://api.nekosapi.com/v3/images/random/file?rating=safe"
				},
				$$inline: true
			});

		orangebar1 = new OrangeBar({ $$inline: true });

		placeholders1 = new Placeholders({
				props: {
					url: "https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=1"
				},
				$$inline: true
			});

		orangebar2 = new OrangeBar({ $$inline: true });

		placeholders2 = new Placeholders({
				props: {
					url: "https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=2"
				},
				$$inline: true
			});

		orangebar3 = new OrangeBar({ $$inline: true });

		placeholders3 = new Placeholders({
				props: {
					url: "https://api.nekosapi.com/v3/images/random/file?rating=safe&tag=8"
				},
				$$inline: true
			});

		commands = new Commands({ $$inline: true });

		const block = {
			c: function create() {
				main = element("main");
				h1 = element("h1");
				h1.textContent = "KAIKIBOT";
				t1 = space();
				h20 = element("h2");
				t2 = text("Your ");
				mark0 = element("mark");
				mark0.textContent = "dad";
				t4 = text(" isn't ");
				em = element("em");
				em.textContent = "this";
				t6 = text(" cool");
				t7 = space();
				div0 = element("div");
				a0 = element("a");
				button0 = element("button");
				button0.textContent = "SUPPORT SERVER";
				t9 = space();
				button1 = element("button");
				button1.textContent = "COMMANDS";
				t11 = space();
				a1 = element("a");
				button2 = element("button");
				button2.textContent = "EMBED BUILDER";
				t13 = space();
				a2 = element("a");
				button3 = element("button");
				button3.textContent = "INVITE KAIKI";
				t15 = space();
				a3 = element("a");
				button4 = element("button");
				button4.textContent = "SOURCE CODE";
				t17 = space();
				a4 = element("a");
				button5 = element("button");
				button5.textContent = "DONATE";
				t19 = space();
				a5 = element("a");
				button6 = element("button");
				button6.textContent = "PATREON";
				t21 = space();
				div15 = element("div");
				div3 = element("div");
				div1 = element("div");
				h30 = element("h3");
				t22 = text("Kaiki is a ");
				mark1 = element("mark");
				mark1.textContent = "dad";
				t24 = text(".");
				t25 = space();
				h40 = element("h4");
				h40.textContent = "He will respond, like a dad, whenever you declare yourself with the\n          use of 'I am'.";
				t27 = space();
				create_component(orangebar0.$$.fragment);
				t28 = space();
				div2 = element("div");
				create_component(placeholders0.$$.fragment);
				t29 = space();
				div6 = element("div");
				div4 = element("div");
				h31 = element("h3");
				h31.textContent = "Useful, fun and silly commands";
				t31 = space();
				h41 = element("h4");
				h41.textContent = "A wide variety of commands from fun and goofy commands to utility and\n          server management focused commands.";
				t33 = space();
				create_component(orangebar1.$$.fragment);
				t34 = space();
				div5 = element("div");
				create_component(placeholders1.$$.fragment);
				t35 = space();
				div9 = element("div");
				div7 = element("div");
				h32 = element("h3");
				h32.textContent = "Manage a large todo list";
				t37 = space();
				h42 = element("h4");
				h42.textContent = "Create goals, save a link you just found or keep a tab on your loaning\n          business.";
				t39 = space();
				create_component(orangebar2.$$.fragment);
				t40 = space();
				div8 = element("div");
				create_component(placeholders2.$$.fragment);
				t41 = space();
				div12 = element("div");
				div10 = element("div");
				h33 = element("h3");
				h33.textContent = "Economy and gambling";
				t43 = space();
				h43 = element("h4");
				h43.textContent = "Spend your hard earned yen on the casino and compete in the currency\n          leaderboard!";
				t45 = space();
				create_component(orangebar3.$$.fragment);
				t46 = space();
				div11 = element("div");
				create_component(placeholders3.$$.fragment);
				t47 = space();
				div13 = element("div");
				h34 = element("h3");
				h34.textContent = "Open source";
				t49 = space();
				h44 = element("h4");
				h44.textContent = "The codebase is fully open source software and available on GitLab. Fork it, clone it and contribute!";
				t51 = space();
				div14 = element("div");
				h35 = element("h3");
				h35.textContent = "Donations";
				t53 = space();
				h45 = element("h4");
				t54 = text("KaikiBot is completely free and open source. Donations are completely optional, but highly appreciated.");
				br = element("br");
				t55 = text("Donations will go towards server costs and support the developer(s), as well as give you reward through Patreon on the Discord server.");
				t56 = space();
				div16 = element("div");
				create_component(commands.$$.fragment);
				t57 = space();
				div20 = element("div");
				div17 = element("div");
				h21 = element("h2");
				h21.textContent = "Kaiki";
				t59 = space();
				h36 = element("h3");
				a6 = element("a");
				t60 = text("Invite");
				t61 = space();
				h37 = element("h3");
				a7 = element("a");
				a7.textContent = "Commands";
				t63 = space();
				div18 = element("div");
				h22 = element("h2");
				h22.textContent = "Selfhosting";
				t65 = space();
				h38 = element("h3");
				a8 = element("a");
				t66 = text("Source code");
				t67 = space();
				h39 = element("h3");
				a9 = element("a");
				t68 = text("Docs");
				t69 = space();
				div19 = element("div");
				h23 = element("h2");
				h23.textContent = "Utilities";
				t71 = space();
				h310 = element("h3");
				a10 = element("a");
				t72 = text("Changelog");
				t73 = space();
				h311 = element("h3");
				a11 = element("a");
				t74 = text("About");
				t75 = space();
				footer = element("footer");
				div21 = element("div");
				h312 = element("h3");
				a12 = element("a");
				t76 = text("Buy me a coffee ☕");
				t77 = space();
				div22 = element("div");
				h313 = element("h3");
				h313.textContent = "© Cata 2023";
				t79 = space();
				div23 = element("div");
				h314 = element("h3");
				a13 = element("a");
				t80 = text("Patreon️");
				attr_dev(h1, "class", "mt-10 mb-5 font-bold text-accent1 text-6xl lg:text-8xl svelte-16bifg2");
				add_location(h1, file, 22, 2, 828);
				attr_dev(mark0, "class", "svelte-16bifg2");
				add_location(mark0, file, 24, 9, 966);
				attr_dev(em, "class", "svelte-16bifg2");
				add_location(em, file, 24, 32, 989);
				attr_dev(h20, "class", "text-2xl mt-5 mb-10 text-accent1 svelte-16bifg2");
				add_location(h20, file, 23, 2, 911);
				attr_dev(button0, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 custom-width-1_7 svelte-16bifg2");
				add_location(button0, file, 28, 6, 1077);
				attr_dev(a0, "href", /*links*/ ctx[1].discord);
				attr_dev(a0, "class", "svelte-16bifg2");
				add_location(a0, file, 27, 4, 1046);
				attr_dev(button1, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 custom-width-1_7 svelte-16bifg2");
				add_location(button1, file, 33, 4, 1226);
				attr_dev(button2, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 custom-width-1_7 svelte-16bifg2");
				add_location(button2, file, 40, 6, 1447);
				attr_dev(a1, "href", /*links*/ ctx[1].embed);
				attr_dev(a1, "class", "svelte-16bifg2");
				add_location(a1, file, 39, 4, 1418);
				attr_dev(button3, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 custom-width-1_7 svelte-16bifg2");
				add_location(button3, file, 46, 6, 1626);
				attr_dev(a2, "href", /*links*/ ctx[1].invite);
				attr_dev(a2, "class", "svelte-16bifg2");
				add_location(a2, file, 45, 4, 1596);
				attr_dev(button4, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 gitlab custom-width-1_7 svelte-16bifg2");
				add_location(button4, file, 52, 6, 1804);
				attr_dev(a3, "href", /*links*/ ctx[1].source);
				attr_dev(a3, "class", "svelte-16bifg2");
				add_location(a3, file, 51, 4, 1774);
				attr_dev(button5, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 paypal custom-width-1_7 svelte-16bifg2");
				add_location(button5, file, 59, 6, 1995);
				attr_dev(a4, "href", /*links*/ ctx[1].paypal);
				attr_dev(a4, "class", "svelte-16bifg2");
				add_location(a4, file, 58, 4, 1965);
				attr_dev(button6, "class", "h-16 whitespace-nowrap md:h-20 border-b-2 text-accent1 patreon custom-width-1_7 svelte-16bifg2");
				add_location(button6, file, 66, 6, 2182);
				attr_dev(a5, "href", /*links*/ ctx[1].patreon);
				attr_dev(a5, "class", "svelte-16bifg2");
				add_location(a5, file, 65, 4, 2151);
				attr_dev(div0, "class", "flex-auto svelte-16bifg2");
				add_location(div0, file, 26, 2, 1018);
				attr_dev(mark1, "class", "italic svelte-16bifg2");
				add_location(mark1, file, 80, 21, 2624);
				attr_dev(h30, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h30, file, 78, 8, 2557);
				attr_dev(h40, "class", "text-accent1 mb-3.5 svelte-16bifg2");
				add_location(h40, file, 82, 8, 2679);
				attr_dev(div1, "class", "text-center md:w-96 svelte-16bifg2");
				add_location(div1, file, 77, 6, 2515);
				attr_dev(div2, "class", "text-center md:w-96 md:h-96 svelte-16bifg2");
				add_location(div2, file, 88, 6, 2867);
				attr_dev(div3, "class", "max-w-full md:flex justify-evenly mb-24 svelte-16bifg2");
				add_location(div3, file, 76, 4, 2455);
				attr_dev(h31, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h31, file, 95, 8, 3148);
				attr_dev(h41, "class", "text-accent1 mb-3.5 svelte-16bifg2");
				add_location(h41, file, 99, 8, 3257);
				attr_dev(div4, "class", "text-center md:w-96 svelte-16bifg2");
				add_location(div4, file, 94, 6, 3106);
				attr_dev(div5, "class", "text-center md:w-96 md:h-96 svelte-16bifg2");
				add_location(div5, file, 106, 6, 3471);
				attr_dev(div6, "class", "max-w-full md:flex flex-row-reverse justify-evenly mb-24 svelte-16bifg2");
				add_location(div6, file, 93, 4, 3029);
				attr_dev(h32, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h32, file, 113, 8, 3741);
				attr_dev(h42, "class", "text-accent1 mb-3.5 svelte-16bifg2");
				add_location(h42, file, 117, 8, 3844);
				attr_dev(div7, "class", "text-center md:w-96 svelte-16bifg2");
				add_location(div7, file, 112, 6, 3699);
				attr_dev(div8, "class", "text-center md:w-96 md:h-96 svelte-16bifg2");
				add_location(div8, file, 124, 6, 4033);
				attr_dev(div9, "class", "max-w-full md:flex justify-evenly mb-24 svelte-16bifg2");
				add_location(div9, file, 111, 4, 3639);
				attr_dev(h33, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h33, file, 131, 8, 4320);
				attr_dev(h43, "class", "text-accent1 mb-3.5 svelte-16bifg2");
				add_location(h43, file, 133, 8, 4399);
				attr_dev(div10, "class", "text-center md:w-96 svelte-16bifg2");
				add_location(div10, file, 130, 6, 4278);
				attr_dev(div11, "class", "text-center md:w-96 md:h-96 svelte-16bifg2");
				add_location(div11, file, 140, 6, 4589);
				attr_dev(div12, "class", "max-w-full md:flex flex-row-reverse justify-evenly mb-24 svelte-16bifg2");
				add_location(div12, file, 129, 4, 4201);
				attr_dev(h34, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h34, file, 147, 6, 4869);
				attr_dev(h44, "class", "text-accent1 svelte-16bifg2");
				add_location(h44, file, 149, 6, 4937);
				attr_dev(div13, "class", "text-left text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-52 svelte-16bifg2");
				add_location(div13, file, 146, 4, 4792);
				attr_dev(h35, "class", "text-accent3 font-bold text-2xl svelte-16bifg2");
				add_location(h35, file, 154, 6, 5184);
				attr_dev(br, "class", "svelte-16bifg2");
				add_location(br, file, 157, 111, 5387);
				attr_dev(h45, "class", "text-accent1 svelte-16bifg2");
				add_location(h45, file, 156, 6, 5250);
				attr_dev(div14, "class", "text-right text-accent1 md:w-8/12 sm:w-10/12 m-auto mt-36 mb-52 svelte-16bifg2");
				add_location(div14, file, 153, 4, 5100);
				attr_dev(div15, "class", "inline-block w-11/12 mt-24 svelte-16bifg2");
				toggle_class(div15, "active", !/*isActive*/ ctx[0]);
				add_location(div15, file, 73, 2, 2347);
				attr_dev(div16, "class", "svelte-16bifg2");
				toggle_class(div16, "active", /*isActive*/ ctx[0]);
				add_location(div16, file, 161, 2, 5560);
				attr_dev(h21, "class", "mt-1 text-accent1 text-2xl text-left svelte-16bifg2");
				add_location(h21, file, 169, 6, 5747);
				attr_dev(a6, "href", /*links*/ ctx[1].invite);
				attr_dev(a6, "class", "svelte-16bifg2");
				add_location(a6, file, 170, 42, 5849);
				attr_dev(h36, "class", "mt-1 flex-col text-left svelte-16bifg2");
				add_location(h36, file, 170, 6, 5813);
				attr_dev(a7, "class", "svelte-16bifg2");
				add_location(a7, file, 174, 7, 6008);
				attr_dev(h37, "class", "mt-1 flex-col text-left cursor-pointer svelte-16bifg2");
				add_location(h37, file, 171, 6, 5894);
				attr_dev(div17, "class", "grid svelte-16bifg2");
				add_location(div17, file, 168, 4, 5722);
				attr_dev(h22, "class", "text-accent1 text-2xl text-left svelte-16bifg2");
				add_location(h22, file, 180, 6, 6092);
				attr_dev(a8, "href", /*links*/ ctx[1].source);
				attr_dev(a8, "class", "svelte-16bifg2");
				add_location(a8, file, 181, 37, 6190);
				attr_dev(h38, "class", "flex-col text-left svelte-16bifg2");
				add_location(h38, file, 181, 6, 6159);
				attr_dev(a9, "href", /*links*/ ctx[1].docs);
				attr_dev(a9, "class", "svelte-16bifg2");
				add_location(a9, file, 182, 38, 6272);
				attr_dev(h39, "class", "flex-col text-left svelte-16bifg2");
				add_location(h39, file, 182, 6, 6240);
				attr_dev(div18, "class", "grid svelte-16bifg2");
				add_location(div18, file, 179, 4, 6067);
				attr_dev(h23, "class", "text-accent1 text-2xl text-left svelte-16bifg2");
				add_location(h23, file, 185, 6, 6347);
				attr_dev(a10, "href", /*links*/ ctx[1].changelog);
				attr_dev(a10, "class", "svelte-16bifg2");
				add_location(a10, file, 186, 38, 6444);
				attr_dev(h310, "class", "flex-col text-left svelte-16bifg2");
				add_location(h310, file, 186, 6, 6412);
				attr_dev(a11, "href", /*links*/ ctx[1].about);
				attr_dev(a11, "class", "svelte-16bifg2");
				add_location(a11, file, 187, 38, 6527);
				attr_dev(h311, "class", "flex-col text-left svelte-16bifg2");
				add_location(h311, file, 187, 6, 6495);
				attr_dev(div19, "class", "grid svelte-16bifg2");
				add_location(div19, file, 184, 4, 6322);
				attr_dev(div20, "class", "grid m-auto mb-20 mt-10 grid-cols-3 justify-items-center w-10/12 text-accent1 svelte-16bifg2");
				add_location(div20, file, 165, 2, 5619);
				attr_dev(main, "class", "svelte-16bifg2");
				add_location(main, file, 21, 0, 819);
				attr_dev(a12, "href", /*links*/ ctx[1].kofi);
				attr_dev(a12, "class", "svelte-16bifg2");
				add_location(a12, file, 194, 6, 6717);
				attr_dev(h312, "class", "flex-col text-sm lg:text-xl svelte-16bifg2");
				add_location(h312, file, 193, 4, 6670);
				attr_dev(div21, "class", "grid svelte-16bifg2");
				add_location(div21, file, 192, 2, 6647);
				attr_dev(h313, "class", "flex-col text-sm lg:text-xl svelte-16bifg2");
				add_location(h313, file, 198, 4, 6804);
				attr_dev(div22, "class", "grid svelte-16bifg2");
				add_location(div22, file, 197, 2, 6781);
				attr_dev(a13, "href", /*links*/ ctx[1].patreon);
				attr_dev(a13, "class", "svelte-16bifg2");
				add_location(a13, file, 202, 6, 6942);
				attr_dev(h314, "class", "flex-col text-sm lg:text-xl svelte-16bifg2");
				add_location(h314, file, 201, 4, 6895);
				attr_dev(div23, "class", "grid svelte-16bifg2");
				add_location(div23, file, 200, 2, 6872);
				attr_dev(footer, "class", "alignment-center grid grid-cols-3 svelte-16bifg2");
				add_location(footer, file, 191, 0, 6594);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, main, anchor);
				append_dev(main, h1);
				append_dev(main, t1);
				append_dev(main, h20);
				append_dev(h20, t2);
				append_dev(h20, mark0);
				append_dev(h20, t4);
				append_dev(h20, em);
				append_dev(h20, t6);
				append_dev(main, t7);
				append_dev(main, div0);
				append_dev(div0, a0);
				append_dev(a0, button0);
				append_dev(div0, t9);
				append_dev(div0, button1);
				append_dev(div0, t11);
				append_dev(div0, a1);
				append_dev(a1, button2);
				append_dev(div0, t13);
				append_dev(div0, a2);
				append_dev(a2, button3);
				append_dev(div0, t15);
				append_dev(div0, a3);
				append_dev(a3, button4);
				append_dev(div0, t17);
				append_dev(div0, a4);
				append_dev(a4, button5);
				append_dev(div0, t19);
				append_dev(div0, a5);
				append_dev(a5, button6);
				append_dev(main, t21);
				append_dev(main, div15);
				append_dev(div15, div3);
				append_dev(div3, div1);
				append_dev(div1, h30);
				append_dev(h30, t22);
				append_dev(h30, mark1);
				append_dev(h30, t24);
				append_dev(div1, t25);
				append_dev(div1, h40);
				append_dev(div1, t27);
				mount_component(orangebar0, div1, null);
				append_dev(div3, t28);
				append_dev(div3, div2);
				mount_component(placeholders0, div2, null);
				append_dev(div15, t29);
				append_dev(div15, div6);
				append_dev(div6, div4);
				append_dev(div4, h31);
				append_dev(div4, t31);
				append_dev(div4, h41);
				append_dev(div4, t33);
				mount_component(orangebar1, div4, null);
				append_dev(div6, t34);
				append_dev(div6, div5);
				mount_component(placeholders1, div5, null);
				append_dev(div15, t35);
				append_dev(div15, div9);
				append_dev(div9, div7);
				append_dev(div7, h32);
				append_dev(div7, t37);
				append_dev(div7, h42);
				append_dev(div7, t39);
				mount_component(orangebar2, div7, null);
				append_dev(div9, t40);
				append_dev(div9, div8);
				mount_component(placeholders2, div8, null);
				append_dev(div15, t41);
				append_dev(div15, div12);
				append_dev(div12, div10);
				append_dev(div10, h33);
				append_dev(div10, t43);
				append_dev(div10, h43);
				append_dev(div10, t45);
				mount_component(orangebar3, div10, null);
				append_dev(div12, t46);
				append_dev(div12, div11);
				mount_component(placeholders3, div11, null);
				append_dev(div15, t47);
				append_dev(div15, div13);
				append_dev(div13, h34);
				append_dev(div13, t49);
				append_dev(div13, h44);
				append_dev(div15, t51);
				append_dev(div15, div14);
				append_dev(div14, h35);
				append_dev(div14, t53);
				append_dev(div14, h45);
				append_dev(h45, t54);
				append_dev(h45, br);
				append_dev(h45, t55);
				append_dev(main, t56);
				append_dev(main, div16);
				mount_component(commands, div16, null);
				append_dev(main, t57);
				append_dev(main, div20);
				append_dev(div20, div17);
				append_dev(div17, h21);
				append_dev(div17, t59);
				append_dev(div17, h36);
				append_dev(h36, a6);
				append_dev(a6, t60);
				append_dev(div17, t61);
				append_dev(div17, h37);
				append_dev(h37, a7);
				append_dev(div20, t63);
				append_dev(div20, div18);
				append_dev(div18, h22);
				append_dev(div18, t65);
				append_dev(div18, h38);
				append_dev(h38, a8);
				append_dev(a8, t66);
				append_dev(div18, t67);
				append_dev(div18, h39);
				append_dev(h39, a9);
				append_dev(a9, t68);
				append_dev(div20, t69);
				append_dev(div20, div19);
				append_dev(div19, h23);
				append_dev(div19, t71);
				append_dev(div19, h310);
				append_dev(h310, a10);
				append_dev(a10, t72);
				append_dev(div19, t73);
				append_dev(div19, h311);
				append_dev(h311, a11);
				append_dev(a11, t74);
				insert_dev(target, t75, anchor);
				insert_dev(target, footer, anchor);
				append_dev(footer, div21);
				append_dev(div21, h312);
				append_dev(h312, a12);
				append_dev(a12, t76);
				append_dev(footer, t77);
				append_dev(footer, div22);
				append_dev(div22, h313);
				append_dev(footer, t79);
				append_dev(footer, div23);
				append_dev(div23, h314);
				append_dev(h314, a13);
				append_dev(a13, t80);
				current = true;

				if (!mounted) {
					dispose = [
						listen_dev(button1, "click", /*click_handler*/ ctx[2], false, false, false, false),
						listen_dev(h37, "click", /*click_handler_1*/ ctx[3], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (!current || dirty & /*isActive*/ 1) {
					toggle_class(div15, "active", !/*isActive*/ ctx[0]);
				}

				if (!current || dirty & /*isActive*/ 1) {
					toggle_class(div16, "active", /*isActive*/ ctx[0]);
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(orangebar0.$$.fragment, local);
				transition_in(placeholders0.$$.fragment, local);
				transition_in(orangebar1.$$.fragment, local);
				transition_in(placeholders1.$$.fragment, local);
				transition_in(orangebar2.$$.fragment, local);
				transition_in(placeholders2.$$.fragment, local);
				transition_in(orangebar3.$$.fragment, local);
				transition_in(placeholders3.$$.fragment, local);
				transition_in(commands.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(orangebar0.$$.fragment, local);
				transition_out(placeholders0.$$.fragment, local);
				transition_out(orangebar1.$$.fragment, local);
				transition_out(placeholders1.$$.fragment, local);
				transition_out(orangebar2.$$.fragment, local);
				transition_out(placeholders2.$$.fragment, local);
				transition_out(orangebar3.$$.fragment, local);
				transition_out(placeholders3.$$.fragment, local);
				transition_out(commands.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(main);
					detach_dev(t75);
					detach_dev(footer);
				}

				destroy_component(orangebar0);
				destroy_component(placeholders0);
				destroy_component(orangebar1);
				destroy_component(placeholders1);
				destroy_component(orangebar2);
				destroy_component(placeholders2);
				destroy_component(orangebar3);
				destroy_component(placeholders3);
				destroy_component(commands);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Page', slots, []);
		let isActive = true;

		const links = Object.freeze({
			changelog: "https://gitlab.com/catadev/KaikiDeishuBot/-/blob/master/CHANGELOG.md",
			discord: "https://discord.gg/8G3AqjnFfX",
			docs: "https://gitlab.com/catadev/KaikiDeishuBot/-/blob/master/docs/GUIDE.md",
			embed: "https://embed.kaikibot.xyz/",
			invite: "https://discord.com/oauth2/authorize?client_id=714695773534814238&scope=bot",
			patreon: "https://www.patreon.com/user?u=52353582",
			paypal: "https://paypal.me/kaikibot",
			source: "https://gitlab.com/catadev/KaikiDeishuBot",
			kofi: "https://ko-fi.com/catadev",
			about: "/about"
		});

		const writable_props = [];

		Object_1.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
		});

		const click_handler = () => $$invalidate(0, isActive = !isActive);
		const click_handler_1 = () => $$invalidate(0, isActive = !isActive);

		$$self.$capture_state = () => ({
			Commands,
			Placeholders,
			OrangeBar,
			isActive,
			links
		});

		$$self.$inject_state = $$props => {
			if ('isActive' in $$props) $$invalidate(0, isActive = $$props.isActive);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [isActive, links, click_handler, click_handler_1];
	}

	class Page extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Page",
				options,
				id: create_fragment.name
			});
		}
	}

	const app = new Page({
	    target: document.body
	});

	return app;

})();
//# sourceMappingURL=bundle.js.map
