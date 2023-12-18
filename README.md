# Algorithm for the Scheduler

## Grade System

The following factors are tracked (when specified by user):

- Time (start/end time)
- Day
- Professor/Faculty
- Location (specifically, Andrew)

Each factor has a certain priority. For Professors and Days, the default is at 0;
the priority can range from 5 to -6, -6 being an auto-rejection. For all other factors,
the default is at -3; it can range from -1 to -6, -6 being an auto-rejection.

## Algorithm

0. User selects courses to schedule for. "Pinned" courses may also be included at
   this point.
1. Each section is graded based on the priorities given by the user. See section
   above for more information.
2. From each course, the best (if tie, earliest) section will be selected as the
   first selection. After the first course is selected, the algorithm will attempt
   fill the next class available block. Repeat until all courses have a section.
3. Generated schedules shall be saved and marked as the "best schedule". To be saved
   and be easily accessible for the user should they decide to have true random.
4. True random shall start off from a random course within the top 1/5th of the
   sections (all courses combined). Use step 2 after that.

### Building on top of the product

0. Algorithm builds a schedule that the user mostly likes. Schedule enters into
   "edit mode" and User Xs section/s that they don't like.
1. These sections will be blacklisted with a special flag. Algorithm from above
   should be used.
2. Algo should (attempt to) propose 3 modified schedules. Option to continue is
   available.
   Technical Note: opting to continue should count as blacklist. No need to save.
