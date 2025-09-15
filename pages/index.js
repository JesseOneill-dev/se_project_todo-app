import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const id = uuidv4();
    const name = addTodoPopupEl._getInputValues().name;
    // evt.target.name.value;
    const dateInput = addTodoPopupEl._getInputValues().date;
    // evt.target.date.value;
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const values = { name, date, id };
    todoCounter.updateTotal(true);
    renderTodo(values);
  },
});

addTodoPopupEl.setEventListeners();

const section = new Section({
  items: [initialTodos],
  renderer: () => {
    // console.log(initialTodos);
    // initialTodos.forEach((initialTodos) => {
    //   const todo = generateTodo(initialTodos);
    //   todosList.append(todo);
    //   }
    // );
  },
  containSelector: ".todos_list",
});

section.rendererItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
    console.log("true");
  } else {
    todoCounter.updateTotal(false);
    console.log("false");
  }
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

// function handleEscapeClose(evt) {
//   if (evt.key === "Escape") {
//     console.log("esc");
//   }
// }

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
  // console.log(addTodoPopupEl._getInputValues());
};

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopupEl.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };

//   renderTodo(values);

//   newTodoValidator.resetValidation();
//   addTodoPopupEl.close();
// });

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
newTodoValidator.checkInitial();
