module.exports = class UserDto {
  email;
  id;
  isActivated;
  nickName;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.nickName = model.nickName;
  }
};
