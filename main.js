const list = {
  _archive: [
      {
    text: 'Купить воду и хлеб',
    condition: true,
    id: Date.now(),
      },
      {
    text: 'Купить воду',
    condition: true,
    id: Date.now(),
      },
      {
    text: 'Сделать домашку',
    condition: false,
    id: Date.now(),
      },
  ],

  //создает заметку
  addTask(text) {
    const newTask = {};
    newTask.text = text;
    newTask.condition = false;
    newTask.id = Date.now();
    for (let i = 0; i < this.archive.length; i++) {
      //проверяет существует ли такая заметка
      if (this.archive[i].text === newTask.text) {
        console.log('Такая задача уже существует');
        break;
      } else {
        this.archive.push(newTask);
        break;
      }
    }
  }, 
    
  //удаляет заметку
  deleteTask(id) {
   if (yesONowDelete()) {
      for (let i = 0; i < this.archive.length; i++) {
        if (id === this.archive[i].id) {
            this.archive.splice(i, 1);
            return this.archive[i];
        }
      }
    }  
  },

  //изменяет заметку
  updateTask(text, id) {
    if (yesONowChange()) {
      for (let i = 0; i < this.archive.length; i++) {
        //проверяет есть ли такие заметки ещё
        if (text === this.archive[i].text) {
                console.log('Такая задача уже существует');
                break;
              } else if (id === this.archive[i].id) {
              this.archive[i].text = text;
                return this.archive[i];
            }
        }
    }
    
  },

  //изменяет статус заметки на выполнено 
  conditionTask(id) {
      for (let i = 0; i < this.archive.length; i++) {
          if (id === this.archive[i].id) {
              this.archive[i].condition = !this.archive[i].condition;
              return this.archive[i];
          }
      }
  },

  //возвращает статистику заметок
  statistics() {
    let result = {};
    result.numberOfTasks = this.archive.length;

    let acc = [];
    let acc2 = [];

     for (let i = 0; i < this.archive.length; i++) {

      if (this.archive[i].condition === true) {
        acc.push(this.archive[i])
        result.completedTasks = acc.length;
      } else if ((this.archive[i].condition === false)) {
        acc2.push(this.archive[i])
        result.outstandingTasks = acc2.length;
      } 
    }
    console.log(result);
    return result;
  },

  get archive() {
      return this._archive;
  },
  
}

//уточняет удалять или нет заметку
const yesONowDelete = () => confirm('Вы точно хотите удалить заметку?');
  
//уточняет сохранить ли изменения
const yesONowChange = () => confirm('Сохранить изменения?');


console.log(list);
// list.addTask('Сходить в магазин');
// list.deleteTask(Date.now());
// list.updateTask('Купить водички', Date.now());
// list.conditionTask(Date.now());
// list.statistics();
console.log(list);


Object.defineProperties(list, {
  _archive: {configurable: false,},
  addTask: {configurable: false,},
  deleteTask: {configurable: false,},
  updateTask: {configurable: false,},
  conditionTask: {configurable: false,},
})

Object.freeze(list);