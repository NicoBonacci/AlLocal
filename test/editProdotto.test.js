const formUtils = require('../Pages/editProdottoMessaggio')

test('mancano tutti i campi', () => {
    expect(formUtils.checkForm()).toBeFalsy();
})

test('manca il campo nome del prodotto', () => {
    expect(formUtils.checkForm("nuova bio prodotto", "2", () => { })).toBeFalsy();
})
test('manca il campo descrizione del prodotto', () => {
    expect(formUtils.checkForm("nome prodotto", "2", () => { })).toBeFalsy();
})

test('manca il campo prezzo del prodotto', () => {
    expect(formUtils.checkForm("nome prodotto", "nuova bio prodotto", () => { })).toBeFalsy();
})

test('modifica di un prodotto in modo coretto', () => {
    expect(formUtils.checkForm("nome prodotto", "nuova bio prodotto", "1", () => { })).toBeTruthy();
})