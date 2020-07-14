class FormValidator {
  constructor(formName) {
    this.formName = formName
  }

  setEventListeners = () => {
    Array.from(this.formName).forEach((inputElement) => {
      if (inputElement.type !== 'submit' && inputElement.tagName !== 'button') {
        inputElement.addEventListener('input', this.handleValidate, true)
      }
    });
  }

  handleValidate = (event) => {
    const submit = event.target.form.querySelector('#submit');
    const [...inputs] = event.target.form.elements;
    this.errorHandler(event.target);
    if (inputs.every(this.checkInputValid)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }

  setSubmitButtonState(formButton, validState) {
    if (validState) {
      formButton.removeAttribute('disabled');
      formButton.classList.add('popup__button_active');
    } else {
      formButton.setAttribute('disabled', true);
      formButton.classList.remove('popup__button_active');
    }
  }

  errorHandler = (inputElement) => {
    const errorElement = document.querySelector(`#error-${inputElement.id}`);
    const valid = this.checkInputValid(inputElement);
    errorElement.textContent = inputElement.validationMessage;
    return valid;
  }

  checkInputValid = (inputElement) => {
    inputElement.setCustomValidity("");
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Это обязательное поле');
      return false
    }
    if (inputElement.validity.tooShort) {
      inputElement.setCustomValidity('Должно быть от 2 до 30 символов');
      return false
    }
    if (inputElement.type !== 'url' && inputElement.value.length > 30) {
      inputElement.setCustomValidity('Должно быть от 2 до 30 символов');
      return false
    }
    if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
      inputElement.setCustomValidity('Здесь должна быть ссылка');
      return false
    }

    return inputElement.checkValidity();
  }

  checkFormValid = () => {
    const inputs = [...this.formName.elements];
    let valid = true;
    inputs.forEach((inputElement) => {
      if (inputElement.type !== 'submit' && inputElement.tagName !== 'button') {
        if (!this.errorHandler(inputElement)) valid = false;
      }
    });

    return valid;
  }

}