export default class Popup {
  constructor(popupName) {
    this.popup = popupName;
    this.close = this.close.bind(this);
  }

  close() {
    this.popup.closest('.popup').classList.remove('popup_is-opened');
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    this.setListeners();
    document.querySelector('.root').appendChild(this.popup);
  }

  setListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  renderLoading(isLoading, text) {
    const button = this.popup.querySelector('button');
    if (isLoading) {
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = text;
    }
  }

}
