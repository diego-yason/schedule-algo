export interface Course {
    CourseTitle: string;
    Section: string;
    Units: string;
    Days: string;
    Time: string;
    Room: string;
    Notes: string;
}

export interface ScrapedCourse {
    classNumber: number;
    faculty: string;
    courseCode: string;
    section: string;
    remarks: string;
    schedule: {
        day: string;
        timeStart: number;
        timeEnd: number;
        room: string;
    }[];
    laguna?: boolean;
}

export interface SchedulePreferences {
    startTime: false | [number, PartialPriority | true];
    endTime: false | [number, PartialPriority | true];
    professors: false | [string, Priority | true][];
    andrew: false | [true, PartialPriority | true];
    laguna: boolean;
}

type PartialPriority = -3 | -2 | -1 | true;
type Priority = -3 | -2 | -1 | 1 | 2 | 3 | true;
