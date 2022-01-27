const formUtils = require('../Pages/registrazioneMessage')

test('mancano tutti i campi', () => {
  expect(formUtils.checkForm()).toBeFalsy();
})

test('mancano alcuni campi', () => {
  expect(formUtils.checkForm("nicholas", "ciaociao")).toBeFalsy();
})

test('mancano dei campi', () => {
  expect(formUtils.checkForm("nicholas@mail.com" , "ciaociao", "ciaociao")).toBeFalsy();
})

test('fromato della mail non valida', () => {
  expect(formUtils.checkForm("nicholas", "nicholas@mail" , "ciaociao", "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #2', () => {
  expect(formUtils.checkForm("nicholas", "nicholasmail" , "ciaociao", "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #3', () => {
  expect(formUtils.checkForm("nicholas", "nicholas@mail.3" , "ciaociao", "ciaociao", () => {})).toBeFalsy();
})

test('fromato della mail non valida #4', () => {
  expect(formUtils.checkForm("nicholas", "nicholas@outlook." , "ciaociao", "ciaociao", () => {})).toBeFalsy();
})

test('le due password sono diverse #1', () => {
  expect(formUtils.checkForm("nicholas", "riccardo@mail.com" , "123456", "p4ssw0rd", () => {})).toBeFalsy();
})

test('le due password sono diverse #2', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.it" , "ciaociao", "ciaoc140", () => {})).toBeFalsy();
})

test('le due password sono diverse #3', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.it" , "12345679", "12345678", () => {})).toBeFalsy();
})

test('password troppo corta #1', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.it" , "ciao", "ciao", () => {})).toBeFalsy();
})

test('password troppo corta #2', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.it" , "ciao12", "ciao12", () => {})).toBeFalsy();
})

test('password troppo corta #3', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.it" , "123", "123", () => {})).toBeFalsy();
})

test('utente corretto #1', () => {
  expect(formUtils.checkForm("nicholas", "ciaomondo@mail.com" , "ciao1234", "ciao1234", () => {})).toBeTruthy();
})

/*
test('Correct input #2', () => {
  expect(formUtils.checkForm("elena", "elena@mail.com" , "123456", "123456", () => {})).toBeTruthy();
})

test('Correct input #3', () => {
  expect(formUtils.checkForm("valmo", "valmo@mail.com" , "20220115", "20220115", () => {})).toBeTruthy();
})*/