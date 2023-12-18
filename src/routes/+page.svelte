<script lang="ts">
    import "../tailwind.css";
    import { mlsData } from "$lib/scraper";
    import { writable, type Writable } from "svelte/store";
    import type { ScrapedCourse, SchedulePreferences } from "$lib/types";

    let file: FileList,
        courses: Writable<ScrapedCourse[]> = writable([]),
        settings: SchedulePreferences,
        courseList: Writable<string[]> = writable([]);

    courses.subscribe((list) => {
        for (const { courseCode } of list) {
            if (!$courseList.indexOf(courseCode))
                courseList.update((arr) => {
                    arr.push(courseCode);
                    return arr;
                });
        }
    });

    async function runScraper() {
        const data = await mlsData(await file[0].text());

        courses.update((existing) => existing.concat(data));
    }

    import CourseInfo from "./CourseInfo.svelte";
    import Settings from "./Settings.svelte";
</script>

<main>
    <h1>Algorithm Test Page</h1>
    <h2>Courses Input</h2>
    <form on:submit|preventDefault={runScraper}>
        <input type="file" bind:files={file} />
        <button>Process</button>
    </form>
    <h3>Sections Included</h3>
    <div class="flex flex-wrap gap-2">
        {#each $courses as course}
            <CourseInfo {...course} />
        {/each}
    </div>
    <h2>Settings/Preferences</h2>
    <Settings bind:settings />
    <h2>Schedule Builder</h2>
    <h3>Courses Included</h3>
    <form on:submit|preventDefault>
        <select>
            <option disabled selected>Select courses to manage</option>
            <!-- BUG:not updating every update to array -->
            {#each $courseList as courseName, index}
                <option value={courseName}>{courseName}</option>
            {/each}
        </select>
        <button>Add</button>
    </form>
    <h3>Proposed Schedules</h3>
    <button>Generate Schedules raaah</button>
</main>
