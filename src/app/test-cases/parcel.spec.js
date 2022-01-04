const { info } = require("console");
const { syncBuiltinESMExports } = require("module");




describe('web-admine -->', function() {

    //成功login daniel1 123456
    it('system login -- login success', function() {
      browser.get('http://localhost:4200/');
      element(by.css("input[formControlName=username]")).sendKeys('daniel1')
      element(by.css("input[formControlName=password]")).sendKeys('123456')
      element(by.buttonText('Sign in')).click()
  
      expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/#/dashboard");
    });

    it('remote open, complete parcels and check parcel in collected list', function(){
        browser.get('http://localhost:4200/#/parcels/%7B%22buid%22:%22b8ea35fc-d647-4b4f-89e8-b8bd8c175fb3%22,%22c%22:%22%22,%22p%22:%22%22,%22id%22:%22%22%7D') // go to the LY2 parcels 
        element(by.css('#pending-tab')).click()
        element.all(by.css('.table-responsive table tbody tr')).filter( function (parcel, index) { // click the first parecel in the pending list
            return parcel.getText().then(function (text) {
                return index==0
              });
        }).first().click()

        
        element(by.className('content-header-title float-left mb-0')).getText().then( function(parcelId){
          parcelId = parcelId.slice(-4)
          // parcelId = '1527'
          console.log("target Parecel id: ", parcelId)
          element(by.buttonText('Remote Unlock')).click() //点击远程弹箱
          element(by.buttonText('Confirm')).click() //点击弹窗的confirm
          browser.sleep(2000) //等待弹窗关闭
          element(by.buttonText('Complete Pickup')).click() //点击complete pickup
          element(by.buttonText('Confirm')).click() //点击弹窗的confirm
          browser.sleep(2000) //等待弹窗关闭

          browser.get('http://localhost:4200/#/parcels/%7B%22buid%22:%22b8ea35fc-d647-4b4f-89e8-b8bd8c175fb3%22,%22c%22:%22%22,%22p%22:%22%22,%22id%22:%22%22%7D') // go to the LY2 parcels 
          element(by.css('#collected-tab')).click() // go to collected parcels
          browser.sleep(2000)

          let text = element.all(by.css('#parcel-id')) //只能拿到collected列表的第一个订单
          expect( text.getText() ).toContain(parcelId)
        })
        
    })
  
  });
  