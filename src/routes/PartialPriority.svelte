<script lang="ts">
    import type { PartialPriority } from "$lib/types";

    export let defaultNo = false;
    export let priority: PartialPriority;

    if (defaultNo) priority = true;
</script>

<div class="grid grid-cols-3 text-center">
    <label>
        <input type="radio" bind:group={priority} value={true} />
        <p>No.</p>
    </label>
    <label>
        <input type="radio" bind:group={priority} value={-3} />
        <p>-3</p>
    </label>
    <label>
        <input type="radio" bind:group={priority} value={-2} />
        <p>-2</p>
    </label>
    <label>
        <input type="radio" bind:group={priority} value={-1} />
        <p>-1</p>
    </label>
</div>
