export async function mlsData(htmlContent: string) {
    const parser = new DOMParser();

    // Create a DOM from the HTML content
    const dom = parser.parseFromString(htmlContent, "text/html");
    const document = dom.documentElement;

    // Find the first element with the "content" class
    const contentElement = document.querySelector(".content");
    if (contentElement == null) throw new Error("Invalid file given");

    // Get the second table element inside the content element
    const tableElements = contentElement.querySelectorAll("table");
    const secondTableElement = tableElements[1];

    // Get the first tbody element inside the second table element
    const tbodyElement = secondTableElement.querySelector("tbody");
    if (tbodyElement == null) throw new Error("Invalid file given");

    // Convert the tr elements inside the tbody element into objects
    const trElements = tbodyElement.querySelectorAll("tr");
    const data = [];

    for (const trElement of trElements) {
        const tdElements = trElement.querySelectorAll("td");
        const rowData = [];

        for (const tdElement of tdElements) {
            const innerHTML = tdElement.innerHTML.trim();

            if (innerHTML.includes("<br>")) {
                const values = innerHTML.split("<br>");
                // clean it up with some trimming
                values.forEach(
                    (value, index) => (values[index] = value.trim()),
                );
                rowData.push(values);
            } else {
                rowData.push(innerHTML);
            }
        }

        const courseTitle = rowData[0];
        const section = rowData[1];
        const units = rowData[2];
        const days = rowData[3];
        const time = rowData[4];
        const room = rowData[5];
        const notes = rowData[6];

        const courseObject = {
            CourseTitle: courseTitle,
            Section: section,
            Units: units,
            Days: days,
            Time: time,
            Room: room,
            Notes: notes,
        };

        data.push(courseObject);
    }

    data.pop();

    // Further processing
    for (const course of data) {
        const newTime = [];
        for (const dualTime of course.Time) {
            newTime.push(dualTime.split("-"));
        }
        // @ts-expect-error The conversion doesn't have a set typedef
        // although, outside of this file, there will be a typedef
        course.Time = newTime;
    }

    return data;
}
