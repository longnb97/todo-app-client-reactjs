export class UseInfoModel{
  constructor(username, password, email, typeuser ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.type = typeuser;
  }
}

export class AccoutLoginModel{
  constructor(password, email, typeuser ) {
    this.email = email;
    this.password = password;
    this.type = typeuser;
  }
}