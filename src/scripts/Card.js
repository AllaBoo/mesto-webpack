class Card {
  constructor(data, popupPhoto, cardTemplate, api) {
    this.data = data;
    this.popupPhoto = popupPhoto;
    this.card = null;
    this.photoZoomer = this.photoZoomer.bind(this);
    this.delete = this.delete.bind(this);
    this.like = this.like.bind(this);
    this.cardTemplate = cardTemplate;
    this.api = api;
  };

  create() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.place-card__name').textContent = this.data.name;
    this.card.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.data.link})`);
    this.card.querySelector('.place-card__like-amount').textContent = this.data.likes.length;
    if (this.data.owner._id === '7621bedc60f2a5b36fe11cda') {
      this.card.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_is-active');
    }
    if (this.data.likes.some((obj) => {
      return obj._id === '7621bedc60f2a5b36fe11cda'
    })) {
      this.card.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
    this.setListeners();
    return this.card;
  }

  photoZoomer() {
    this.popupPhoto.zoom(this.data.link);
  }

  delete(event) {
    event.stopPropagation();
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.api.deleteCard(this.data._id)
        .then(() => {
          this.removeListeners();
        })
        .then(() => {
          this.card.remove();
        })
        .catch(err => alert(err));
    }
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon_liked')) {
      this.api.deleteLike(this.data._id)
        .then((res) => {
          this.updateLikes(res)
        })
        .catch(err => alert(err));
    } else {
      this.api.putLike(this.data._id)
        .then((res) => {
          this.updateLikes(res)
        })
        .catch(err => alert(err));
    }
  }

  updateLikes(res) {
    this.card.querySelector('.place-card__like-amount').textContent = res.likes.length;
    this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  setListeners() {
    this.card.querySelector('.place-card__like-icon').addEventListener('click', () => this.like(event));
    this.card.querySelector('.place-card__image').addEventListener('click', this.photoZoomer);
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', () => this.delete(event));
  }

  removeListeners() {
    this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.delete);
    this.card.querySelector('.place-card__image').removeEventListener('click', this.photoZoomer);
  }

}
