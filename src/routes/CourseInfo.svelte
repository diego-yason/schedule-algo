<script lang="ts">
    export let courseCode: string;
    export let section: string;
    export let faculty: string;
    export let classNumber: number;
    export let remarks: string;
    export let schedule: {
        day: string;
        timeStart: number;
        timeEnd: number;
        room: string;
    }[];
    export let laguna = false;
</script>

<div class="outline-black gap-3 outline-2 outline p-3 grid grid-cols-3">
    {#if laguna}
        <p class="col-span-3 bg-red-400 p-1 text-center">LAGUNA CLASS</p>
    {/if}
    <p>{classNumber}</p>
    <p>{courseCode}</p>
    <p>{section}</p>
    <p class="col-span-3">{faculty}</p>
    <p class="col-span-3">{remarks}</p>
    {#each schedule as { day, room, timeEnd, timeStart }}
        <div class="col-span-3 grid grid-cols-2">
            <p>{day}</p>
            <p>{room}</p>
            <p>{timeStart}</p>
            <p>{timeEnd}</p>
        </div>
    {/each}
</div>
