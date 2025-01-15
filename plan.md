##### PlannerBook

#### Summary

- PlannerBook is a stupid simple way to keep your goals at the forefront of your schedule. Whether it's with work, social life, or any aspect that you choose, you can take control of your life by recording your goals and creating a time based plan to acheive them. To accomplish this purpose, PlannerBook has a few key features:
- Goals page: A place for you to view all the goals you have set for yourself.
- Calendar page: A place for you to keep plans for the week on when and how you will accomplish something
  - Day page: A view of all 24 hours! You can set events, plan contacts, and tag events with the associated goal.
  - Week page: A way to navigate between different days and get a larger view of your week.
  - Month page: View all the tasks you have in a month!
- Tasks page: view all checklist items in one place for the next day, the next week, or the next month!

#### Requirements

- [x] Menu

  - title / header
  - navigation bar for goals, calendar, tasks

- [ ] Goals page:

  - Social, intellectual, physical, and spiritual Goal sections
  - [ ] Goals can be entered or saved.
  - [ ] Goals have progress bars
  - [ ] Clicking on a goal opens a dropdown with more details

- [ ] Day calendar page:

  - schedule events for the day, tie to a specific goal
  - show tasks for the day all in one place as well
  - Number for daily tasks completed, remaining, and overdue

- [ ] Week calendar page

  - Show the week of the current day.
  - Display the entire schedule for each day
  - show number of weekly tasks completed, remaining, and overdue.

- [ ] Month calendar page:

  - show each day of the current month
  - show up to three of the scheduled events for each day
  - Show number of monthly tasks completed, remaining, and overdue

- [ ] Tasks page:

  - heading with number of overdue tasks
  - subsections with daily, weekly, and monthly tasks all following the pattern below:
    - total num tasks
    - total tasks completed
    - total num tasks overdue
    - total tasks remaining
    - list of first 10 tasks: button to view all tasks

#### Design

### GoalManager class
  - Provide a table with all the goals of an associated category
  - Each table row can be expanded with a drop-down box to display all of the goals info
  - Add another goal to the database
  - Update a goal within the database
    - ```
      updateGoal = (id) => (goalObj) => {api.updateGoal(id, goalObj)}
      ```
    - ```
      updateTasks = (id, goalObj) => (taskList) => {
        goalObj.tasks = taskList;
        api.updateGoal(id, goalObj)
        }
      ```
    - This format allows for id and taskList to be passed in directly as a part of updateTasks rather than separately into each TaskRow.
  - Delete a goal from the database

### GoalRow class
  - param: goal object, update function, isDark boolean.
  - idea: Create a goal row with edit, dropdown, title, date, and progress sections.
  - Methods:
    - constructor:
      - ```
        constructor(goalObj, updateFcn) {
          // the purpose of the constructor is to establish EVERY element. All other methods control visibility.
          create row, btnContainer, goal, date, and progress sections as DOM elements
          do same for edit, save, dropdown, and cancel buttons
          Create two input elements, one for goaltitle and one for the date
          add event listeners for everything
          this.goalObj = goalObj;
          this.updateFcn = updateFcn;
          append btnContainer, goal title, date, and progress sections to this.row

        }
        ```

    - buildRow:
      - ```
        buildRow() {
          goalelement.innerHTML = this.goalObj.title;
          dateelement.innerHTML = this.goalObj.end_date;
          progresselement.innerHTML = this.goalObj.progress.completed / this.goalObj.progress.total;

          btnContainer.innerHTML = ""
          append edit and dropdown buttons into btnContainer.
        }
        ```

    - doEdit:
      - ```
        doEdit = () => {
          // Event handler for edit button
          clear btnContainer
          append save and cancel buttons to btnContainer.

          clear goal and date sections
          append the goal and date input fields into their proper sections.
          set initial value of input fields to goalObj's original values.
          // Note: doSave and doCancel handle the closing of doEdit
        }
        ```

    - doSave:
      - ```
        doSave = () => {
          // Note: This method is the event handler for a click on the save button.

          this.goalObj.title = goalInput.value;
          this.goalObj.end_date = dateInput.value;
          updateFcn()
          buildRow();
        }
        ```
    - doCancel:
      - ```
        doCancel = () => {
          buildRow();
        }
        ```
    - doDropDown:
      - ```

        ```

### TaskRow class

  - param: task object, update function
    - update function is updateTasks from GoalManager class
  - Methods:
    - constructor:
      - ```
        constructor(taskObj, updateFcn) {
          create row and btnContainer, task, date, and progress sections as DOM elements
          do the same for edit, save, and cancel buttons, add event listeners
          this.taskObj = taskObj
          this.updateFcn = updateFcn
        }
        ```

    - buildRow
      - Format:
      - ```
        buildRow = () => {
          insert editBtn into btnContainer
          add an event listener to the checkbox("click", () => changeCompleted())
          append btnContainer, goal, date, and progress sections (in that order) to row.
          set the innerHTML of each section according to taskObj's respective value
          set checkbox.checked as true if taskObj.complete === true
          return row
        }
        ```

    - doEdit:
      - Changes the row into a series of inputs
      - edit button becomes a 'cancel' and a 'save' button
        - 'cancel' returns the row to it's original state
        - 'save' updates the inputted 'task object' then calls updateTasks() through 'saveChanges'
      - All other sections (besides checkbox) becomes an input with the initial value of whatever was there previously.
      - ```
        doEdit = () => {
          clear event listener on checkbox
          clear innerHTML of goal, date, and btnContainer sections
          Place input box in goal and date sections
          Place cancel and save buttons into btnContainer
        }
        ```

    - saveChanges:
      - called when save button clicked
        - ```
          saveChanges = () => {
            if (!this.goalSection.firstChild.value) {
              return;
            }
            newTask = {
              name: this.goalSection.firstChild.value
              date: this.dateSection.firstChild.value
              complete: this.dateSection.firstChild.checked
            }
            this.taskObj = newTask;
            updateFcn();
          }
          ```

    - cancelChanges:
      - Called when cancel button clicked
      - ```
        cancelChanges = () => {
          clear innerHTML of btnContainer, goal, date, and progress sections
          buildRow();
        }
        ```

    - changeCompleted:
      - Called when checkbox is clicked
      - ```
        changeCompleted = () => {
          this.taskObj.complete = this.checkbox.checked
          updateFcn();
        }
        ```
