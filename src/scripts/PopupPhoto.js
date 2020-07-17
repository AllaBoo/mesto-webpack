import Popup from './Popup.js';
export class PopupPhoto extends Popup {
  constructor(popupName) {
    super(popupName);
    this.open = this.open.bind(this);
  }

  zoom(content) {
    this.popup.querySelector('.popup__photo').setAttribute('src', content);
    this.open();
  }

}