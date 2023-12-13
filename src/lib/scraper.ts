import type { ScrapedCourse } from "./types";

export async function mlsData(htmlContent: string): Promise<ScrapedCourse[]> {
    const parser = new DOMParser();

    // Parse HTML string into a document
    const dom = parser.parseFromString(htmlContent, "text/html");
    const body = dom.body;

    // Find header for table: p element with class "content_title"
    const contentElement = body.querySelector(".content_title")?.parentElement;
    if (contentElement == null) throw new Error("Invalid file given");

    // Access the form element within the content element
    const formElement = contentElement.querySelector("form");
    if (formElement == null) throw new Error("Invalid file given");

    // Get the second table element inside the content element
    const tableElement = formElement.querySelector("table");
    if (tableElement == null) throw new Error("Invalid file given");

    // Get the first tbody element inside the second table element
    const tbodyElement = tableElement.querySelector("tbody");
    if (tbodyElement == null) throw new Error("Invalid file given");
    console.log(tbodyElement);

    // Get all tr elements from tbody
    const trElements = tbodyElement.querySelectorAll("tr");

    // delete first tr element
    trElements[0].remove();

    const data: ScrapedCourse[] = [];
    let sectionData: Partial<ScrapedCourse> = {};

    // TODO: add a case where prof name is not indicated (it can happen sometimes)
    for (const row of trElements) {
        const tdElements = row.querySelectorAll("td");
        // check if row has the "1" attribute
        if (row.getAttribute("1") != null) {
            if (sectionData.faculty == null)
                sectionData.faculty = tdElements[0].innerText.trim() ?? "";
            continue;
        }

        if (tdElements[0].innerText.trim() == "Class Nbr") continue;

        let days = tdElements[3].innerText.trim().split("");

        const time = tdElements[4].innerText
            .trim()
            .split("-")
            .map((x) => x.trim());
        const timeStart = parseInt(time[0]);
        const timeEnd = parseInt(time[1]);

        let room = tdElements[5].innerText.trim(); // room is sometimes empty
        if (room == "") room = "TBA";

        if (sectionData.schedule == null) sectionData.schedule = [];
        // check if first td only contains &nbsp;
        const isContinuation = tdElements[0].innerText.trim() == "";
        if (isContinuation) {
            for (const day of days)
                sectionData.schedule.push({
                    day,
                    timeStart,
                    timeEnd,
                    room,
                });
            continue;
        } else {
            if (sectionData.courseCode != null) {
                // do things and push
                data.push(sectionData as ScrapedCourse);
                sectionData = {};
                sectionData.schedule = [];
            }
        }

        const classNumber = parseInt(tdElements[0].innerText.trim());
        const courseCode = tdElements[1].innerText.trim();
        const section = tdElements[2].innerText.trim();
        const remarks = tdElements[8].innerText.trim();

        sectionData.classNumber = classNumber;
        sectionData.courseCode = courseCode;
        sectionData.section = section;
        sectionData.remarks = remarks;

        if (section.startsWith("X")) sectionData.laguna = true;

        for (const day of days)
            sectionData.schedule.push({
                day,
                timeStart,
                timeEnd,
                room,
            });
    }
    data.push(sectionData as ScrapedCourse);

    console.log(data);

    return data;
}
