const formUtils = require('../Pages/cambioPasswordMessage')

test('manca la password da andare a sosotituire', () => {
    expect(formUtils.checkForm()).toBeFalsy();
})

test('le due password sono diverse', () => {
    expect(formUtils.checkForm("123456", "p4ssw0rd", () => { })).toBeFalsy();
})

test('password troppo corta', () => {
    expect(formUtils.checkForm("ciao", "ciao", () => { })).toBeFalsy();
})

test('il cambio della password viene confermato', () => {
    expect(formUtils.checkForm("ciaociao", "ciaociao", () => { })).toBeTruthy();
})

