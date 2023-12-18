<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type {
        SchedulePreferences,
        PartialPriority,
        Priority,
    } from "$lib/types";

    export let settings: Partial<SchedulePreferences> = {};

    let startTime: number | undefined,
        startTimePriority: PartialPriority,
        endTime: number | undefined,
        endTimePriority: PartialPriority,
        tempProf: string,
        avoidAndrew: boolean,
        lagunaCampus = false,
        andrewPriority: PartialPriority;
    const professor: Writable<[string, Priority][]> = writable([]);

    import FullPriority from "./FullPriority.svelte";
    import PartialPriorityComponent from "./PartialPriority.svelte";
</script>

<form
    on:submit|preventDefault={() => {
        settings = {
            startTime: startTime ? [startTime, startTimePriority] : false,
            endTime: endTime ? [endTime, endTimePriority] : false,
            andrew: avoidAndrew ? [avoidAndrew, andrewPriority] : false,
            professors: $professor.length != 0 ? $professor : false,
            laguna: lagunaCampus,
        };

        console.log(settings);
    }}
>
    <div class="w-min whitespace-nowrap">
        <label for="earliestTime"> Preferred Start of Day </label>
        <input
            id="earliestTime"
            type="time"
            min="07:30"
            max="21:00"
            bind:value={startTime}
        />
        {#if startTime}
            <PartialPriorityComponent bind:priority={startTimePriority} />
            <button on:click={() => (startTime = undefined)}>x</button>
        {/if}
    </div>
    <div class="w-min whitespace-nowrap">
        <label for="earliestTime"> Preferred End of Day </label>
        <input
            id="earliestTime"
            type="time"
            min="07:30"
            max="21:00"
            bind:value={endTime}
        />
        {#if endTime}
            <PartialPriorityComponent bind:priority={endTimePriority} />
            <button on:click={() => (endTime = undefined)}>x</button>
        {/if}
    </div>
    <div class="w-min whitespace-nowrap">
        <label for="profTextBar"> Professors </label>
        <form
            on:submit|preventDefault={() => {
                professor.update((prof) => {
                    prof.push([tempProf, -1]);
                    return prof;
                });
                tempProf = "";
            }}
        >
            <input id="profTextBar" type="text" bind:value={tempProf} />
            <button>Add Professor</button>
        </form>
        {#each $professor as prof, index}
            <div class="grid grid-cols-2">
                <p>{prof[0]}</p>
                <button
                    on:click={() => {
                        professor.update((data) => {
                            data.splice(index, 1);
                            return data;
                        });
                    }}
                    type="button">x</button
                >
                <span class="col-span-2">
                    <FullPriority bind:priority={prof[1]} />
                </span>
            </div>
        {/each}
        <div class="w-min whitespace-nowrap">
            <label for="andrew"> Avoid Andrew? </label>
            <input type="checkbox" id="andrew" bind:checked={avoidAndrew} />
            {#if avoidAndrew}
                <PartialPriorityComponent bind:priority={andrewPriority} />
            {/if}
        </div>
        <div>
            <label for="laguna"> Consider Laguna? </label>
            <input type="checkbox" id="laguna" bind:checked={lagunaCampus} />
        </div>
    </div>
    <button>Update Preferences</button>
</form>
