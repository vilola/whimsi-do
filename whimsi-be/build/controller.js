const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {
  nanoid
} = require('nanoid');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
exports.getAll = (req, res) => {
  setTimeout(() => {
    const posts = db.get('tasks').sortBy('createdDate').reverse().value();
    res.send(posts);
  }, 3000);
};
exports.getCompleted = (req, res) => {
  const posts = db.get('tasks').filter(item => item.completed).sortBy('createdDate').reverse().value();
  res.send(posts);
};
exports.create = (req, res) => {
  if (!req.body.text) {
    res.status(422).send('\'text\' field must be present in json');
  } else {
    const written = db.get('tasks').push({
      id: nanoid(),
      text: req.body.text,
      completed: false,
      createdDate: new Date().getTime()
    }).last().write();
    res.send(written);
  }
};
exports.delete = (req, res) => {
  const id = req.params['id'];
  if (!id) {
    res.status(422).send('\'id\' must be present in params');
  } else {
    const deleted = db.get('tasks').remove({
      id
    }).write();
    if (deleted.length === 0) {
      res.status(404).send('id not found, nothing to delete');
    } else {
      res.send();
    }
  }
};
exports.updateText = (req, res) => {
  const {
    text
  } = req.body;
  const id = req.params['id'];
  if (!text) {
    res.status(422).send('\'text\' field must be present in json');
  } else if (!id) {
    res.status(422).send('\'id\' must be present in params');
  } else {
    const written = db.get('tasks').find({
      id
    }).assign({
      text
    }).write();
    res.send(written);
  }
};
exports.complete = (req, res) => {
  const id = req.params['id'];
  if (!id) {
    res.status(422).send('\'id\' must be present in params');
  } else {
    const completed = db.get('tasks').find({
      id,
      completed: false
    }).assign({
      completed: true,
      completedDate: new Date().getTime()
    }).write();
    if (!completed.id) {
      res.status(404).send('id not found or trying to complete already completed item');
    } else {
      res.send(completed);
    }
  }
};
exports.incomplete = (req, res) => {
  const id = req.params['id'];
  if (!id) {
    res.status(422).send('\'id\' must be present in params');
  } else {
    const incompleted = db.get('tasks').find({
      id,
      completed: true
    }).assign({
      completed: false,
      completedDate: undefined
    }).write();
    if (!incompleted.id) {
      res.status(404).send('id not found or trying to incomplete not completed item');
    } else {
      res.send(incompleted);
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJsb3ciLCJyZXF1aXJlIiwiRmlsZVN5bmMiLCJuYW5vaWQiLCJhZGFwdGVyIiwiZGIiLCJleHBvcnRzIiwiZ2V0QWxsIiwicmVxIiwicmVzIiwic2V0VGltZW91dCIsInBvc3RzIiwiZ2V0Iiwic29ydEJ5IiwicmV2ZXJzZSIsInZhbHVlIiwic2VuZCIsImdldENvbXBsZXRlZCIsImZpbHRlciIsIml0ZW0iLCJjb21wbGV0ZWQiLCJjcmVhdGUiLCJib2R5IiwidGV4dCIsInN0YXR1cyIsIndyaXR0ZW4iLCJwdXNoIiwiaWQiLCJjcmVhdGVkRGF0ZSIsIkRhdGUiLCJnZXRUaW1lIiwibGFzdCIsIndyaXRlIiwiZGVsZXRlIiwicGFyYW1zIiwiZGVsZXRlZCIsInJlbW92ZSIsImxlbmd0aCIsInVwZGF0ZVRleHQiLCJmaW5kIiwiYXNzaWduIiwiY29tcGxldGUiLCJjb21wbGV0ZWREYXRlIiwiaW5jb21wbGV0ZSIsImluY29tcGxldGVkIiwidW5kZWZpbmVkIl0sInNvdXJjZXMiOlsiLi4vc3JjL2NvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbG93ID0gcmVxdWlyZSgnbG93ZGInKTtcbmNvbnN0IEZpbGVTeW5jID0gcmVxdWlyZSgnbG93ZGIvYWRhcHRlcnMvRmlsZVN5bmMnKTtcbmNvbnN0IHsgbmFub2lkIH0gPSByZXF1aXJlKCduYW5vaWQnKVxuXG5jb25zdCBhZGFwdGVyID0gbmV3IEZpbGVTeW5jKCdkYXRhL2RiLmpzb24nKTtcbmNvbnN0IGRiID0gbG93KGFkYXB0ZXIpO1xuXG5leHBvcnRzLmdldEFsbCA9IChyZXEsIHJlcykgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3N0cyA9IGRiLmdldCgndGFza3MnKVxuICAgICAgICAgICAgLnNvcnRCeSgnY3JlYXRlZERhdGUnKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgIHJlcy5zZW5kKHBvc3RzKTtcbiAgICB9LCAzMDAwKTtcbn07XG5cbmV4cG9ydHMuZ2V0Q29tcGxldGVkID0gKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgcG9zdHMgPSBkYi5nZXQoJ3Rhc2tzJylcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wbGV0ZWQpXG4gICAgICAgIC5zb3J0QnkoJ2NyZWF0ZWREYXRlJylcbiAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAudmFsdWUoKTtcbiAgICByZXMuc2VuZChwb3N0cyk7XG59O1xuXG5leHBvcnRzLmNyZWF0ZSA9IChyZXEsIHJlcykgPT4ge1xuICAgIGlmICghcmVxLmJvZHkudGV4dCkge1xuICAgICAgICByZXMuc3RhdHVzKDQyMikuc2VuZCgnXFwndGV4dFxcJyBmaWVsZCBtdXN0IGJlIHByZXNlbnQgaW4ganNvbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdyaXR0ZW4gPSBkYi5nZXQoJ3Rhc2tzJylcbiAgICAgICAgICAgIC5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogbmFub2lkKCksXG4gICAgICAgICAgICAgICAgdGV4dDogcmVxLmJvZHkudGV4dCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWREYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubGFzdCgpXG4gICAgICAgICAgICAud3JpdGUoKTtcbiAgICAgICAgcmVzLnNlbmQod3JpdHRlbik7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kZWxldGUgPSAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXNbJ2lkJ107XG4gICAgaWYgKCFpZCkge1xuICAgICAgICByZXMuc3RhdHVzKDQyMikuc2VuZCgnXFwnaWRcXCcgbXVzdCBiZSBwcmVzZW50IGluIHBhcmFtcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBkYi5nZXQoJ3Rhc2tzJylcbiAgICAgICAgICAgIC5yZW1vdmUoe2lkfSlcbiAgICAgICAgICAgIC53cml0ZSgpO1xuICAgICAgICBpZiAoZGVsZXRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdpZCBub3QgZm91bmQsIG5vdGhpbmcgdG8gZGVsZXRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy51cGRhdGVUZXh0ID0gKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3Qge3RleHR9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgaWQgPSByZXEucGFyYW1zWydpZCddO1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXMuc3RhdHVzKDQyMikuc2VuZCgnXFwndGV4dFxcJyBmaWVsZCBtdXN0IGJlIHByZXNlbnQgaW4ganNvbicpO1xuICAgIH0gZWxzZSBpZiAoIWlkKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDIyKS5zZW5kKCdcXCdpZFxcJyBtdXN0IGJlIHByZXNlbnQgaW4gcGFyYW1zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd3JpdHRlbiA9IGRiLmdldCgndGFza3MnKVxuICAgICAgICAgICAgLmZpbmQoe2lkfSlcbiAgICAgICAgICAgIC5hc3NpZ24oe3RleHR9KVxuICAgICAgICAgICAgLndyaXRlKCk7XG4gICAgICAgIHJlcy5zZW5kKHdyaXR0ZW4pO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY29tcGxldGUgPSAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXNbJ2lkJ107XG4gICAgaWYgKCFpZCkge1xuICAgICAgICByZXMuc3RhdHVzKDQyMikuc2VuZCgnXFwnaWRcXCcgbXVzdCBiZSBwcmVzZW50IGluIHBhcmFtcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IGRiLmdldCgndGFza3MnKVxuICAgICAgICAgICAgLmZpbmQoe1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFzc2lnbih7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZERhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC53cml0ZSgpO1xuICAgICAgICBpZiAoIWNvbXBsZXRlZC5pZCkge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ2lkIG5vdCBmb3VuZCBvciB0cnlpbmcgdG8gY29tcGxldGUgYWxyZWFkeSBjb21wbGV0ZWQgaXRlbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzLnNlbmQoY29tcGxldGVkKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuaW5jb21wbGV0ZSA9IChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IGlkID0gcmVxLnBhcmFtc1snaWQnXTtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDIyKS5zZW5kKCdcXCdpZFxcJyBtdXN0IGJlIHByZXNlbnQgaW4gcGFyYW1zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaW5jb21wbGV0ZWQgPSBkYi5nZXQoJ3Rhc2tzJylcbiAgICAgICAgICAgIC5maW5kKHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFzc2lnbih7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWREYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLndyaXRlKCk7XG4gICAgICAgIGlmICghaW5jb21wbGV0ZWQuaWQpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCdpZCBub3QgZm91bmQgb3IgdHJ5aW5nIHRvIGluY29tcGxldGUgbm90IGNvbXBsZXRlZCBpdGVtJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMuc2VuZChpbmNvbXBsZXRlZCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUM1QixNQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztBQUNuRCxNQUFNO0VBQUVFO0FBQU8sQ0FBQyxHQUFHRixPQUFPLENBQUMsUUFBUSxDQUFDO0FBRXBDLE1BQU1HLE9BQU8sR0FBRyxJQUFJRixRQUFRLENBQUMsY0FBYyxDQUFDO0FBQzVDLE1BQU1HLEVBQUUsR0FBR0wsR0FBRyxDQUFDSSxPQUFPLENBQUM7QUFFdkJFLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxLQUFLO0VBQzNCQyxVQUFVLENBQUMsTUFBTTtJQUNiLE1BQU1DLEtBQUssR0FBR04sRUFBRSxDQUFDTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQ3hCQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQ3JCQyxPQUFPLENBQUMsQ0FBQyxDQUNUQyxLQUFLLENBQUMsQ0FBQztJQUNaTixHQUFHLENBQUNPLElBQUksQ0FBQ0wsS0FBSyxDQUFDO0VBQ25CLENBQUMsRUFBRSxJQUFJLENBQUM7QUFDWixDQUFDO0FBRURMLE9BQU8sQ0FBQ1csWUFBWSxHQUFHLENBQUNULEdBQUcsRUFBRUMsR0FBRyxLQUFLO0VBQ2pDLE1BQU1FLEtBQUssR0FBR04sRUFBRSxDQUFDTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQ3hCTSxNQUFNLENBQUVDLElBQUksSUFBS0EsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FD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