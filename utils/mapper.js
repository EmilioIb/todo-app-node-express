const timesUtils = require('./times.utils');

class Mapper {
  mappTodos = (todosRaw, timeOffset) => {
    const todosClean = [];

    for (const todoRaw of todosRaw) {
      const { timesTodoClean, totalDuration } = this.mappTimesTodos(todoRaw.times, timeOffset);

      const todoClean = {
        idTodo: todoRaw.id_todo,
        todoName: todoRaw.name,
        projectName: todoRaw.project,
        completed: todoRaw.completed,
        workingOn: todoRaw.working_on,
        times: timesTodoClean,
        totalDuration,
      };

      const todoFather = todosClean.find(grouppedTodo => grouppedTodo.projectId == todoRaw.id_project);

      if (todoFather) {
        todoFather.todos.push(todoClean);
      } else {
        todosClean.push({
          projectId: todoRaw.id_project,
          projectName: todoRaw.project,
          todos: [todoClean],
        });
      }
    }
    return todosClean;
  };

  mappTimesTodos = (timesTodosRaw, timeOffset) => {
    const timesTodoClean = [];
    let totalDuration = 0;
    const dateForClient = timesUtils.transformDateToClientHour(null, timeOffset);

    for (const timeRaw of timesTodosRaw) {
      timeRaw.started_at = timesUtils.transformDateToClientHour(timeRaw.started_at, timeOffset);
      timeRaw.stopped_at = timeRaw.stopped_at ? timesUtils.transformDateToClientHour(timeRaw.stopped_at, timeOffset) : timeRaw.stopped_at;
      const duration = timeRaw.stopped_at ? timeRaw.stopped_at - timeRaw.started_at : dateForClient - timeRaw.started_at;

      totalDuration += duration;
      timesTodoClean.push({
        idTimesTodo: timeRaw.id_times_todo,
        startedAt: timesUtils.formatDate(timeRaw.started_at),
        stoppedAt: timeRaw.stopped_at ? timesUtils.formatDate(timeRaw.stopped_at) : 'Not finished',
        duration: timesUtils.getTimeFormatted(duration),
      });
    }
    totalDuration = timesUtils.getTimeFormatted(totalDuration);
    return { timesTodoClean, totalDuration };
  };

  mappProjects = projectsRaw => {
    const projectsClean = [];

    for (const projectRaw of projectsRaw) {
      projectsClean.push({
        idProject: projectRaw.id_project,
        name: projectRaw.name,
      });
    }
    return projectsClean;
  };
}

module.exports = new Mapper();
