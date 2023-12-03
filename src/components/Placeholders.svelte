<script lang="ts">
    export let url: string;
</script>

<img class="svg-class" src="{url}" />

<style>
    .svg-class {
        transition: 0.5s;
        max-width: 100%;
        max-height: 100%;
    }
    .svg-class:hover {
        transform: scale(110%);
        transition: 0.5s;
    }

    @media (max-width: 640px) {
        svg.svg-class {
            transition: 0s;
        }
        svg.svg-class:hover {
            transform: scale(100%);
        }
    }
</style>
