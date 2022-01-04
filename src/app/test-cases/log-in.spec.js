

describe('web-admine', function() {
  //成功login daniel1 123456
    it('system login -- login success', function() {
    browser.get('http://localhost:4200/');
    element(by.css("input[formControlName=username]")).sendKeys('daniel1')
    element(by.css("input[formControlName=password]")).sendKeys('123456')
    element(by.buttonText('Sign in')).click()

    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/#/dashboard");

    browser.sleep(5000)

    /* logout the system */
    element(by.id('navbarUserDropdown')).click() //find the dropdown menu
    element(by.css('.danger')).click() //click the logout button

  });

  // 失败login 密码为空
    it('system login -- login fail with empyty password', function() {
    browser.get('http://localhost:4200/');
    element(by.css("input[formControlName=username]")).sendKeys('daniel1')
    browser.sleep(3500)
    element(by.css("input[formControlName=password]")).sendKeys('')
    browser.sleep(3500)
    element(by.buttonText('Sign in')).click()
    browser.sleep(3500)
    
    expect (element(by.css('.invalid-feedback')).isDisplayed()).toBe(true)
  });

  // 失败login 密码错误
    it('system login -- login fail with wrong password', function() {
    browser.get('http://localhost:4200/');
    element(by.css("input[formControlName=username]")).sendKeys('daniel1')
    browser.sleep(3500)
    element(by.css("input[formControlName=password]")).sendKeys('123')
    browser.sleep(3500)
    element(by.buttonText('Sign in')).click()
    browser.sleep(3500)
    expect (element(by.css('ngb-alert')).getText()).toEqual('password not match with username')
  });

});
