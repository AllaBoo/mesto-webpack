import Popup from './Popup.js';
export class PopupEditUser extends Popup {
  constructor(popupName, formValidator, api, userInfo) {
    super(popupName);
    this.submitEditUser = this.submitEditUser.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.formValidator = formValidator;
    this.userName = document.querySelector('#username');
    this.userJob = document.querySelector('#userjob');
    this.avatar = document.querySelector('#avatar');
    this.form = this.popup.querySelector('#formProfile');
    this.api = api;
    this.userInfo = userInfo;
  }

  open() {
    super.open();
    this.updateForm();
    this.setSubmitListeners();
    this.popup.querySelector('#submit').removeAttribute('disabled');
    this.popup.querySelector('#submit').classList.add('popup__button_active');
    this.popup.querySelectorAll('.popup__error-message').forEach((inputElement) => {
      inputElement.textContent = '';
    });
    this.formValidator(this.form).setEventListeners();
  }

  close() {
    const spans = Array.from(this.popup.querySelectorAll('span'))
    spans.forEach((span) => {
      span.textContent = '';
    });
    super.close();
  }

  updateForm() {
    const currentUserName = document.querySelector('.user-info__name').textContent;
    const currentUserJob = document.querySelector('.user-info__job').textContent;
    const currentUserPhoto = document.querySelector('.user-info__photo').textContent;
    this.userName.value = currentUserName;
    this.userJob.value = currentUserJob;
    this.avatar.value = currentUserPhoto;
  }

  submitEditUser = (event) => {
    event.preventDefault();
    super.renderLoading(true);
    const newUserInfo = {
      nikname: this.userName.value,
      job: this.userJob.value,
      avatar: this.avatar.value
    };
    this.formValidator(this.form).checkFormValid();
    this.api.patchUserAvatar(newUserInfo.avatar)
      .then(res => {
        this.userInfo.updateUserAvatar(res);
      })
      .catch(err => alert(err));
    this.api.patchUserInfo(newUserInfo)
      .then(res => {
        this.userInfo.updateUserInfo(res);
      })
      .then(() => {
        this.close();
      })
      .catch(err => alert(err))
      .finally(() => {
        super.renderLoading(false, 'Сохранить');
      });
  }

  setSubmitListeners() {
    this.form.addEventListener('submit', this.submitEditUser);
  }

}

