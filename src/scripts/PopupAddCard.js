import Popup from './Popup.js';
export class PopupAddCard extends Popup {
  constructor(popupName, addCard, formValidator, api) {
    super(popupName);
    this.addCard = addCard;
    this.formValidator = formValidator;
    this.form = this.popup.querySelector('#formAdd');
    this.api = api;
  }

  open = () => {
    super.open();
    this.setSubmitListeners();
    this.popup.querySelector('#submit').setAttribute('disabled', true);
    this.popup.querySelector('#submit').classList.remove('popup__button_active');
    this.formValidator(this.popup.querySelector('#formAdd')).setEventListeners();
  }

  close() {
    this.form.reset();
    const spans = Array.from(this.popup.querySelectorAll('span'))
    spans.forEach((span) => {
      span.textContent = '';
    });
    super.close();
  }

  submitAddCard = (event) => {
    event.preventDefault();
    super.renderLoading(true);
    const nameByUser = this.popup.querySelector('#placename');
    const linkByUser = this.popup.querySelector('#placelink');
    const userObj = {
      name: nameByUser.value,
      link: linkByUser.value
    };
    this.formValidator(this.popup.querySelector('#formAdd')).checkFormValid();
    this.api.postCard(userObj)
      .then(res => {
        this.addCard(res);
      })
      .then(() => {
        this.form.reset();
      })
      .then(() => {
        this.close();
      })
      .catch(err => alert(err))
      .finally(() => {
        super.renderLoading(false, '+');
      });

  }

  setSubmitListeners() {
    this.form.addEventListener('submit', this.submitAddCard, { once: true });
  }


}
