<script lang="ts">
    import "./conditions.css";
    let { children } = $props();
</script>

<div class="max-w-1/2 m-auto mt-5 wrap-break-word conditions">
    {@render children?.()}
</div>
