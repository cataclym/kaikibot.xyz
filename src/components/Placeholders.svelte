<svg width="24rem" height="15rem" class="svg-class">
    <rect style="fill: var(--accent2)" width="24rem" height="15rem"/>
    <text dx="50%" text-anchor="middle" dy="60%" font-size="64" fill="var(--background)">Placeholder</text>
</svg>

<style>
    .svg-class {
        transition: 0.5s;
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
