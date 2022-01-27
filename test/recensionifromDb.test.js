const formUtils = require('../fromDatabase/recensioniFromDbMessage')

test('manca il campo recensione', () => {
  expect(formUtils.checkForm()).toBeFalsy();
})

test('la recensione è stata scritta correttamente', () => {
    expect(formUtils.checkForm("questa è la prova di una recensione", () => {})).toBeTruthy();
  })

