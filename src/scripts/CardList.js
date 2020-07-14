
class CardList {
  constructor(placeList, popup, cardTemplate, createCard, api) {
    this.placeList = placeList;
    this.popup = popup;
    this.cardTemplate = cardTemplate;
    this.createCard = createCard;
    this.api = api;
  };

  addCard = (data) => {
    this.placeList.appendChild(this.createCard(data, this.popup, this.cardTemplate, this.api).create());
  }

  render() {
    this.api.getInitialCards().then(res => {
      res.forEach(data => {
        this.addCard(data, this.popup)
      });
    })
      .catch(err => alert(err));
  }
}