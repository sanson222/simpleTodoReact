var db = [];
var internalCount = 0;

export const mongoSimulator = {
  save(model) {
    if (model.todoId === null) {
      let _idDate = internalCount++;
      db[_idDate] = model;
    } else {
      let _idDate = model.todoId;
      delete model.todoId;
      db[_idDate] = model;
    }
  },

  delete(id) {
    if (db[id] !== undefined) {
      delete db[id];
      return true;
    }
    return false;
  },

  get(id) {
    return db[id];
  },

  getAll() {
    return db;
  }
};
