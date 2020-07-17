export class UserInfo {
  constructor(api, userData) {
    this.api = api;
    this.userData = userData;
  }

  setUserInfo() {
    this.api.getUserInfo()
      .then(res => {
        this.userData.name.textContent = res.name;
        this.userData.job.textContent = res.about;
        this.userData.avatar.setAttribute('style', `background-image: url(${res.avatar})`)
      })
      .catch(err => alert(err));
  }

  updateUserInfo(res) {
    this.userData.name.textContent = res.name;
    this.userData.job.textContent = res.about;
  }

}