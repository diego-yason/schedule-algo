import type { ScrapedCourse, SchedulePreferences } from "./types";
export function gradeSection(
    section: ScrapedCourse,
    { andrew, endTime, laguna, professors, startTime }: SchedulePreferences,
) {
    let grade = 10;

    // laguna check
    if (
        (!laguna && section.section.startsWith("X")) ||
        (laguna && !section.section.startsWith("X"))
    ) {
        return -999;
    }

    // andrew check
    if (andrew) {
        let isAndrew = false;
        // check if schedule has an andrew class
        for (const schedule of section.schedule) {
            if (schedule.room.startsWith("A")) {
                isAndrew = true;
                break;
            }
        }

        if (isAndrew) {
            if (andrew[1] === true) return -999;
            grade += 10 * (andrew[1] as number);
        }
    }

    // professor check
    for (const prof of professors || []) {
        if (section.faculty.includes(prof[0])) {
            grade += 10 * (prof[1] as number);
            break;
        }
    }

    // start time check
    if (startTime) {
        for (const time of section.schedule) {
            if (time.timeStart < startTime[0]) {
                if (startTime[1] == true) return -999;
                grade += 10 * (startTime[1] as number);
            }
        }
    }

    if (endTime) {
        for (const time of section.schedule) {
            if (time.timeEnd > endTime[0]) {
                if (endTime[1] == true) return -999;
                grade += 10 * (endTime[1] as number);
            }
        }
    }
}
