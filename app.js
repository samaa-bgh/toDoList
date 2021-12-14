function ElementBuilder(name) {
    this.element = document.createElement(name);
  
    this.text = function (text) {
      this.element.textContent = text;
      return this;
    };
  
    this.type = function (type) {
      this.element.type = type;
      return this;
    };
  
    this.placeholder = function (text) {
      this.element.placeholder = text;
      return this;
    };
  
    this.value = function (value) {
      this.element.value = value;
      return this;
    };
  
    this.appendTo = function (parent) {
      if (parent instanceof ElementBuilder) {
        parent.build().appendChild(this.element);
        return this;
      } else {
        parent.appendChild(this.element);
        return this;
      }
    };
  
    this.id = function (id) {
      this.element.id = id;
      return this;
    };
  
    this.name = function (name) {
      this.element.name = name;
      return this;
    };
  
    this.action = function (action) {
      this.element.action = action;
      return this;
    };
  
    this.method = function (method) {
      this.element.method = method;
      return this;
    };
  
    this.target = function (target) {
      this.element.target = target;
      return this;
    };
  
    this.build = function () {
      return this.element;
    };
  
    this.hide = function () {
      this.element.style.display = "none";
      return this;
    };
  
    this.show = function () {
      this.element.style.display = "block";
      return this;
    };
  
    this.className = function (className) {
      this.element.className = className;
      return this;
    };
  
    this.onClick = function (fn) {
      this.element.onclick = fn;
      return this;
    };
  
    this.html = function (htmlValue) {
      this.element.innerHTML = htmlValue;
      return this;
    };
  
    this.src = function (src) {
      this.element.src = src;
      return this;
    };
  
    this.alt = function (alt) {
      this.element.alt = alt;
      return this;
    };
  }
  
  const builder = {
    create(name){
      return new ElementBuilder(name);
    }
  };

class Task  {
    constructor(name){
        this.name = name;
        this.completed = false;
    }

    complete(){
        this.completed = true;
    }

    undo(){
        this.completed = false;
    }
}

class ToDoList {
    constructor(){
        this.Tasks =[];
    }

    add(name){
        const task = new Task(name);
        this.Tasks.push(task);
    }

    remove(tsk){
        const index = this.Tasks.indexOf(tsk);
        //const index = this.Tasks.findIndex(tsk => tsk.id === id );
        if(index != -1)
            this.Tasks.splice(index,1);
    }

    search(keyword){
        return this.Tasks.filter((tsk)=>{
                    return tsk.name.toLowerCase().includes(keyword.toLowerCase());
                })
    }
}

class ToDoListApp{
    constructor(){
        this.todoList = new ToDoList();
        this.input = document.getElementById("myInput");
        this.addBtn = document.getElementById("addBtn");
        this.ul = document.getElementById("myUL");
    }

    init(){
        this.addBtn.addEventListener('click',()=>{
            const name = this.input.value;
            if(name===""){
                alert("pleas full your task!!!");
            }
            this.todoList.add(name);
            this.print(this.todoList.Tasks);
            this.input.value="";
        });

        this.input.addEventListener('input',()=>{
            const keyword = this.input.value;
            const resultSearch = this.todoList.search(keyword);
            this.print(resultSearch);
        })
    }

    print(taskList){
        this.ul.innerHTML='';
        taskList.forEach((task)=>{
            const li = builder
            .create("li")
            .text(task.name)
            .onClick((()=>{
                if(task.completed){
                    task.undo();
                }
                else{
                    task.complete();
                }
                this.print(this.todoList.Tasks);
            }))
            .appendTo(this.ul);

            if(task.completed){
                li.className("checked");
            }

            const delBtn = builder
            .create("span")
            .text("×")
            .className("close")
            .onClick(()=>{
                this.todoList.remove(task);
             //   this.todoList.remove(task.id);
            })
            .appendTo(li);
        })
        
    }
}


const app = new ToDoListApp();
app.init();



