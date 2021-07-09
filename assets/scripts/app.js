class DOMhandler {
  static appendToDom(newAddress, projectItem) {
    newAddress.append(projectItem);
  }
  static updateDOM(projectItem, type, fnc) {
    const switchBtn = projectItem.querySelectorAll('button')[1];
    switchBtn.textContent = type;
    switchBtn.addEventListener('click', fnc.bind(null, projectItem.id));
  }
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static updateInfoBtn(infButtonDOM, func, oldFunc, newFunc) {
    infButtonDOM.addEventListener('click', func.bind(null, newFunc, oldFunc));
  }
  static clearInfoButton(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Components {
  constructor() {}
  detach() {
    this.exInfElement.remove();
    this.projectClassInstance.extraInfoFlag = 0;
  }
  attach() {
    this.projectElement.parentNode.insertBefore(
      this.infoCardElement,
      this.projectElement.nextSibling
    );
    this.projectClassInstance.extraInfoFlag = 1;
  }
  switch(){
    this.detach();
    this.attach();
  }
}
class Info extends Components {
  constructor(projectElement, projectClassInstance) {
    super();
    this.projectClassInstance = projectClassInstance;
    this.projectClassInstance.extraInfoFlag = 1;
    this.projectElement = projectElement;
    this.buttonDOM = projectElement.querySelector('button:first-of-type');
    this.exInfoText = this.projectElement.dataset.extraInfo;
    this.createInfoElement();
    this.render(this.attach.bind(this), this.detach.bind(this)); //bind dene
    this.exInfElement = this.projectElement.nextElementSibling;
  }
  update(oldFunc, newFunc) {
    this.buttonDOM = DOMhandler.clearInfoButton(this.buttonDOM);
    DOMhandler.updateInfoBtn(
      this.buttonDOM,
      this.render.bind(this),
      oldFunc,
      newFunc
    );
  }
  render(funcToDo, newFunc) {
    funcToDo();
    this.update(funcToDo, newFunc);
  }
  createInfoElement() {
    this.infoCardElement = document.createElement('div');
    this.infoCardElement.className = 'card';
    this.infoCardElement.innerHTML = `<h5>${this.exInfoText}</h5>`;
  }
}

class Project {
  constructor(id, switchFunction) {
    this.id = id;
    this.extraInfoFlag = 0 ;
    this.switchHandler = switchFunction;
    this.projectDom = document.getElementById(id);
    this.infoButtonDom = this.projectDom.querySelector('button');

    this.switchButtonDom = this.infoButtonDom.nextElementSibling;
    this.switchButtonActivate();
    this.moreInfoButtonActivate();
  }
  switchButtonActivate() {
    this.switchButtonDom.addEventListener(
      'click',
      this.switchHandler.bind(null, this.id)
    );
  }
  infoHandler() {
    this.moreInfoClassInstance = new Info(this.projectDom, this);
  }
  moreInfoButtonActivate() {
    this.infoButtonDom.addEventListener('click', this.infoHandler.bind(this));
  }
}

class ProjectList {
  projects = [];
  constructor(statusName, btnText) {
    this.buttonText = btnText;
    this.statusName = statusName;
    const listElements = document.querySelectorAll(
      `#${statusName}-projects li`
    );
    for (const element of listElements) {
      this.projects.push(
        new Project(element.id, this.switchHandler.bind(this))
      );
    }
  }

  switchHandler(id) {
    const index = this.projects.findIndex((obj) => obj.id === id);
    const projectItemElement = document.getElementById(id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMhandler.clearEventListeners(switchBtn);
    this.switchAddHandler(this.projects[index]);
    this.projects = this.projects.filter((obj) => obj.id != id);
  }
  switchAddBridge(switchAdd) {
    this.switchAddHandler = switchAdd;
  }
  switchAdd(projectClassInstance) {
    this.projects.push(projectClassInstance);
    const projectItem = document.getElementById(projectClassInstance.id);
    const listDomId = document.querySelector(`#${this.statusName}-projects ul`);
    DOMhandler.appendToDom(listDomId, projectItem);
    DOMhandler.updateDOM(
      projectItem,
      this.buttonText,
      this.switchHandler.bind(this)
    );
    if(projectClassInstance.extraInfoFlag === 1){
    projectClassInstance.moreInfoClassInstance.switch();
  }}
}

class AddProject{
  constructor(activeProject){
    this.projectNumber = 4;
    this.connectAddButton();
    this.activeProjectsList = activeProject;
  }
  createProjectElement(name, explanation, moreInf){
    const newProjectElement = document.createElement("li");
    newProjectElement.id=`p${this.projectNumber}`;
    newProjectElement.dataset.extraInfo = moreInf;
    newProjectElement.className ="card";
    newProjectElement.innerHTML=` 
    <h2>${name}</h2>
    <p>${explanation}</p>
    <button class="alt">More Info</button>
    <button>Finish</button>`;
    return newProjectElement;
  }
  createProject(){
    const projectName = document.getElementById("project-name-input").value;
    const projectExplanation = document.getElementById("explanation-input").value;
    const MoreInfo = document.getElementById("more-info-input").value;
    const projectElement = this.createProjectElement(projectName, projectExplanation, MoreInfo);
    const activeProjectListElement = document.querySelector("#active-projects ul");
    activeProjectListElement.append(projectElement);
    this.activeProjectsList.projects.push( new Project(projectElement.id, this.activeProjectsList.switchHandler.bind(this.activeProjectsList)))
    this.projectNumber++;
  }

  
  connectAddButton(){
    const addBtn = document.getElementById("add-button");
    addBtn.addEventListener("click", this.createProject.bind(this));
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active', 'Finish');
    const finishedProjectsList = new ProjectList('finished', 'Activate');
    activeProjectsList.switchAddBridge(
      finishedProjectsList.switchAdd.bind(finishedProjectsList)
    );
    finishedProjectsList.switchAddBridge(
      activeProjectsList.switchAdd.bind(activeProjectsList)
    );
    new AddProject(activeProjectsList);
  }
}

App.init();
