export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    console.log(this._popupElement);
  }

  _handleEscapeClose(evt) {
    console.log(this);
    if (evt.key === "Escape") {
      console.log("esc");
      console.log(this._popupElement);
      this.close();
      //   _popupElement.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
    console.log("open");
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
    console.log("close");
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
