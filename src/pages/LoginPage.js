export default class LoginPage {
  constructor(page) {
    this.page = page
  }

  async login(user_id, user_password) {
    await this.page.waitAndType('#user_login', user_id)
    await this.page.waitAndType('#user_password', user_password)
    await this.page.waitAndClick('.btn-primary')
  }
}
