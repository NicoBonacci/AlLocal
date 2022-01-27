const formUtils = require('../Pages/loginMessage')

test('mancano tutti i campi', () => {
  expect(formUtils.checkForm()).toBeFalsy();
})

test('manca il campo mail',() =>{
    expect(formUtils.checkForm("ciao1234")).toBeFalsy();
})

test('manca il campo password',() =>{
    expect(formUtils.checkForm("ciaomondo@mail.it")).toBeFalsy();
})

test('fromato della mail non valida', () => {
  expect(formUtils.checkForm("nicholas@mail" , "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #2', () => {
  expect(formUtils.checkForm("nicholasmail" , "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #3', () => {
  expect(formUtils.checkForm("nicholas@mail.3" , "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #4', () => {
  expect(formUtils.checkForm("nicholas@outlook.","ciaociao", () => {})).toBeFalsy();
})

test('utente corretto #1', () => {
  expect(formUtils.checkForm("ciaomondo@mail.com" , "ciao1234", () => {})).toBeTruthy();
})

test('utente corretto #2', () => {
    expect(formUtils.checkForm("paperino@mail.it" , "ciaociao", () => {})).toBeTruthy();
  })

test('utente non corretto', () => {
  expect(formUtils.checkForm("elena@mail.it","elena123", () => {})).toBeTruthy();
})
