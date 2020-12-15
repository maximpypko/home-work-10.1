const list = {
  _archive: [
      {
    text: 'Купить воду и хлеб',
    condition: false,
    id: Date.now(),
      },
      {
    text: 'Купить воду',
    condition: true,
    id: Date.now(),
      },
      {
    text: 'Сделать домашку',
    condition: true,
    id: Date.now(),
      },
  ],

//добавляет заметку
  addTask(text) {
    const newTask = {
      text: text,
      id: Date.now(),
      condition: false,
    };

    const result = this.archive.filter(acc => acc.text === text);
    result.length > 0 ? console.log('Такая заметка уже существует') :
      this.archive.push(newTask);
  },

  //удаляет заметку
  deleteTask(id, confirm ) {
    const index = this.findNoteById(id);
  
    if (index >= 0 && typeof confirm === 'function' && confirm()) {
      this.archive.splice(index, 1);
    }
  },

  //изменяет заметку
  updateTask(text, id, confirm) {

    const result = this.archive.filter(acc => acc.text === text);
    if (result.length > 0) {
      console.log('Такая заметка уже существует');
    } else {
      const index = this.findNoteById(id);

      if (index >= 0 && text && typeof confirm === 'function' && confirm()) {
        this.archive[index].text = text;
      }
    }
  },

  //изменяет статус заметки на выполнено 
  conditionTask(id) {
    const index = this.findNoteById(id);

    if (index >= 0) {
      this.archive[index].condition = true;
    }
  },

  //возвращает статистику заметок
  getStatistics() {
    const result = this.archive.reduce(function (acc, value) {
      
      value.condition === true ? acc.completed += 1 : acc.uncompleted += 1;
      acc.totalTasks = acc.completed + acc.uncompleted;

      return acc;
    },{
      completed: 0,
      uncompleted: 0,
      totalTasks: 0,
    })
    
    console.log(result);
  },

  get archive() {
      return this._archive;
  },

  findNoteById(id) {
    return this.archive.findIndex(newTask => newTask.id === id);
  },
  
}

console.log(list);
// list.addTask('Купить воду');
// list.deleteTask(Date.now(), () => confirm('Удалить заметку?'));
// list.updateTask('Купить воду', Date.now(),() => confirm('Сохранить изменения?'));
// list.conditionTask(Date.now());
// list.getStatistics();
console.log(list);


Object.defineProperties(list, {
  _archive: {configurable: false,},
  addTask: {configurable: false,},
  deleteTask: {configurable: false,},
  updateTask: {configurable: false,},
  conditionTask: {configurable: false,},
  getStatistics: { configurable: false },
  findNoteById: {configurable: false},
})

Object.freeze(list);