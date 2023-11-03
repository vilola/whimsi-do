const controller = require('./controller.js');

/**
 * @typedef {object} Task
 * @property {string} id.required - Identification
 * @property {string} text.required - Content
 * @property {boolean} completed.required - Status
 * @property {number} createdDate.required - Date when task was created (Timestamp)
 * @property {number} completedDate - Date when task was completed (Timestamp)
 */

/**
 * @typedef {object} CreateTask
 * @property {string} text.required - Content
 */

/**
 * @typedef {object} UpdateTask
 * @property {string} text.required - Content
 */

module.exports = app => {
  /**
   * GET /tasks
   * @summary Returns all tasks. Slow service, around 3 seconds
   * @tags Tasks
   * @return {array<Task>} 200 - success response - application/json
   */
  /**
   * POST /tasks
   * @summary Creates task with given text then returns it
   * @tags Tasks
   * @param {CreateTask} request.body.required - text
   * @return {Task} 200 - Task created - application/json
   * @return {string} 422 - Bad request response
   */
  app.route('/tasks').get(controller.getAll).post(controller.create);

  /**
   * GET /tasks/completed
   * @summary Returns all completed tasks
   * @tags Tasks
   * @return {array<Task>} 200 - success response - application/json
   */
  app.route('/tasks/completed').get(controller.getCompleted);

  /**
   * POST /tasks/{id}
   * @summary Updates text of given task
   * @tags Tasks
   * @param {string} id.path.required - ID of task
   * @param {UpdateTask} request.body.required - text
   * @return {array<Task>} 200 - Task updated - application/json
   * @return {string} 422 - Bad request
   */
  /**
   * DELETE /tasks/{id}
   * @summary Deletes given task
   * @tags Tasks
   * @param {string} id.path.required - ID of task
   * @return {array<Task>} 200 - Task deleted - application/json
   * @return {string} 422 - Bad request
   * @return {string} 400 - ID of task was not found
   */
  app.route('/tasks/:id').post(controller.updateText).delete(controller.delete);

  /**
   * POST /tasks/{id}/complete
   * @summary Completes given task, then returns modified task
   * @tags Tasks
   * @param {string} id.path.required - ID of task
   * @return {array<Task>} 200 - success response - application/json
   * @return {string} 422 - Bad request
   * @return {string} 400 - ID of task was not found
   */
  app.route('/tasks/:id/complete').post(controller.complete);

  /**
   * POST /tasks/{id}/incomplete
   * @summary Incompletes given task, then returns modified task
   * @tags Tasks
   * @param {string} id.path.required - ID of task
   * @return {array<Task>} 200 - success response - application/json
   * @return {string} 422 - Bad request
   * @return {string} 400 - ID of task was not found
   */
  app.route('/tasks/:id/incomplete').post(controller.incomplete);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb250cm9sbGVyIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcHAiLCJyb3V0ZSIsImdldCIsImdldEFsbCIsInBvc3QiLCJjcmVhdGUiLCJnZXRDb21wbGV0ZWQiLCJ1cGRhdGVUZXh0IiwiZGVsZXRlIiwiY29tcGxldGUiLCJpbmNvbXBsZXRlIl0sInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyLmpzJyk7XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gVGFza1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkLnJlcXVpcmVkIC0gSWRlbnRpZmljYXRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZXh0LnJlcXVpcmVkIC0gQ29udGVudFxuICogQHByb3BlcnR5IHtib29sZWFufSBjb21wbGV0ZWQucmVxdWlyZWQgLSBTdGF0dXNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjcmVhdGVkRGF0ZS5yZXF1aXJlZCAtIERhdGUgd2hlbiB0YXNrIHdhcyBjcmVhdGVkIChUaW1lc3RhbXApXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29tcGxldGVkRGF0ZSAtIERhdGUgd2hlbiB0YXNrIHdhcyBjb21wbGV0ZWQgKFRpbWVzdGFtcClcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IENyZWF0ZVRhc2tcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZXh0LnJlcXVpcmVkIC0gQ29udGVudFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gVXBkYXRlVGFza1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHRleHQucmVxdWlyZWQgLSBDb250ZW50XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG5cbiAgICAvKipcbiAgICAgKiBHRVQgL3Rhc2tzXG4gICAgICogQHN1bW1hcnkgUmV0dXJucyBhbGwgdGFza3MuIFNsb3cgc2VydmljZSwgYXJvdW5kIDMgc2Vjb25kc1xuICAgICAqIEB0YWdzIFRhc2tzXG4gICAgICogQHJldHVybiB7YXJyYXk8VGFzaz59IDIwMCAtIHN1Y2Nlc3MgcmVzcG9uc2UgLSBhcHBsaWNhdGlvbi9qc29uXG4gICAgICovXG4gICAgLyoqXG4gICAgICogUE9TVCAvdGFza3NcbiAgICAgKiBAc3VtbWFyeSBDcmVhdGVzIHRhc2sgd2l0aCBnaXZlbiB0ZXh0IHRoZW4gcmV0dXJucyBpdFxuICAgICAqIEB0YWdzIFRhc2tzXG4gICAgICogQHBhcmFtIHtDcmVhdGVUYXNrfSByZXF1ZXN0LmJvZHkucmVxdWlyZWQgLSB0ZXh0XG4gICAgICogQHJldHVybiB7VGFza30gMjAwIC0gVGFzayBjcmVhdGVkIC0gYXBwbGljYXRpb24vanNvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gNDIyIC0gQmFkIHJlcXVlc3QgcmVzcG9uc2VcbiAgICAgKi9cbiAgICBhcHAucm91dGUoJy90YXNrcycpXG4gICAgICAgIC5nZXQoY29udHJvbGxlci5nZXRBbGwpXG4gICAgICAgIC5wb3N0KGNvbnRyb2xsZXIuY3JlYXRlKTtcblxuICAgIC8qKlxuICAgICAqIEdFVCAvdGFza3MvY29tcGxldGVkXG4gICAgICogQHN1bW1hcnkgUmV0dXJucyBhbGwgY29tcGxldGVkIHRhc2tzXG4gICAgICogQHRhZ3MgVGFza3NcbiAgICAgKiBAcmV0dXJuIHthcnJheTxUYXNrPn0gMjAwIC0gc3VjY2VzcyByZXNwb25zZSAtIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKi9cbiAgICBhcHAucm91dGUoJy90YXNrcy9jb21wbGV0ZWQnKVxuICAgICAgICAuZ2V0KGNvbnRyb2xsZXIuZ2V0Q29tcGxldGVkKTtcblxuICAgIC8qKlxuICAgICAqIFBPU1QgL3Rhc2tzL3tpZH1cbiAgICAgKiBAc3VtbWFyeSBVcGRhdGVzIHRleHQgb2YgZ2l2ZW4gdGFza1xuICAgICAqIEB0YWdzIFRhc2tzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkLnBhdGgucmVxdWlyZWQgLSBJRCBvZiB0YXNrXG4gICAgICogQHBhcmFtIHtVcGRhdGVUYXNrfSByZXF1ZXN0LmJvZHkucmVxdWlyZWQgLSB0ZXh0XG4gICAgICogQHJldHVybiB7YXJyYXk8VGFzaz59IDIwMCAtIFRhc2sgdXBkYXRlZCAtIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IDQyMiAtIEJhZCByZXF1ZXN0XG4gICAgICovXG4gICAgLyoqXG4gICAgICogREVMRVRFIC90YXNrcy97aWR9XG4gICAgICogQHN1bW1hcnkgRGVsZXRlcyBnaXZlbiB0YXNrXG4gICAgICogQHRhZ3MgVGFza3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQucGF0aC5yZXF1aXJlZCAtIElEIG9mIHRhc2tcbiAgICAgKiBAcmV0dXJuIHthcnJheTxUYXNrPn0gMjAwIC0gVGFzayBkZWxldGVkIC0gYXBwbGljYXRpb24vanNvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gNDIyIC0gQmFkIHJlcXVlc3RcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IDQwMCAtIElEIG9mIHRhc2sgd2FzIG5vdCBmb3VuZFxuICAgICAqL1xuICAgIGFwcC5yb3V0ZSgnL3Rhc2tzLzppZCcpXG4gICAgICAgIC5wb3N0KGNvbnRyb2xsZXIudXBkYXRlVGV4dClcbiAgICAgICAgLmRlbGV0ZShjb250cm9sbGVyLmRlbGV0ZSk7XG5cbiAgICAvKipcbiAgICAgKiBQT1NUIC90YXNrcy97aWR9L2NvbXBsZXRlXG4gICAgICogQHN1bW1hcnkgQ29tcGxldGVzIGdpdmVuIHRhc2ssIHRoZW4gcmV0dXJucyBtb2RpZmllZCB0YXNrXG4gICAgICogQHRhZ3MgVGFza3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQucGF0aC5yZXF1aXJlZCAtIElEIG9mIHRhc2tcbiAgICAgKiBAcmV0dXJuIHthcnJheTxUYXNrPn0gMjAwIC0gc3VjY2VzcyByZXNwb25zZSAtIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IDQyMiAtIEJhZCByZXF1ZXN0XG4gICAgICogQHJldHVybiB7c3RyaW5nfSA0MDAgLSBJRCBvZiB0YXNrIHdhcyBub3QgZm91bmRcbiAgICAgKi9cbiAgICBhcHAucm91dGUoJy90YXNrcy86aWQvY29tcGxldGUnKVxuICAgICAgICAucG9zdChjb250cm9sbGVyLmNvbXBsZXRlKTtcblxuICAgIC8qKlxuICAgICAqIFBPU1QgL3Rhc2tzL3tpZH0vaW5jb21wbGV0ZVxuICAgICAqIEBzdW1tYXJ5IEluY29tcGxldGVzIGdpdmVuIHRhc2ssIHRoZW4gcmV0dXJucyBtb2RpZmllZCB0YXNrXG4gICAgICogQHRhZ3MgVGFza3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQucGF0aC5yZXF1aXJlZCAtIElEIG9mIHRhc2tcbiAgICAgKiBAcmV0dXJuIHthcnJheTxUYXNrPn0gMjAwIC0gc3VjY2VzcyByZXNwb25zZSAtIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IDQyMiAtIEJhZCByZXF1ZXN0XG4gICAgICogQHJldHVybiB7c3RyaW5nfSA0MDAgLSBJRCBvZiB0YXNrIHdhcyBub3QgZm91bmRcbiAgICAgKi9cbiAgICBhcHAucm91dGUoJy90YXNrcy86aWQvaW5jb21wbGV0ZScpXG4gICAgICAgIC5wb3N0KGNvbnRyb2xsZXIuaW5jb21wbGV0ZSk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUMsTUFBTSxDQUFDQyxPQUFPLEdBQUlDLEdBQUcsSUFBSztFQUV0QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lBLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNkQyxHQUFHLENBQUNOLFVBQVUsQ0FBQ08sTUFBTSxDQUFDLENBQ3RCQyxJQUFJLENBQUNSLFVBQVUsQ0FBQ1MsTUFBTSxDQUFDOztFQUU1QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUwsR0FBRyxDQUFDQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FDeEJDLEdBQUcsQ0FBQ04sVUFBVSxDQUFDVSxZQUFZLENBQUM7O0VBRWpDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJTixHQUFHLENBQUNDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDbEJHLElBQUksQ0FBQ1IsVUFBVSxDQUFDVyxVQUFVLENBQUMsQ0FDM0JDLE1BQU0sQ0FBQ1osVUFBVSxDQUFDWSxNQUFNLENBQUM7O0VBRTlCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJUixHQUFHLENBQUNDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUMzQkcsSUFBSSxDQUFDUixVQUFVLENBQUNhLFFBQVEsQ0FBQzs7RUFFOUI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0lULEdBQUcsQ0FBQ0MsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQzdCRyxJQUFJLENBQUNSLFVBQVUsQ0FBQ2MsVUFBVSxDQUFDO0FBQ3BDLENBQUMifQ==