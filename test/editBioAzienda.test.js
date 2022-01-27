const formUtils = require('../Pages/editBioAziendaMessage')

test('mancano tutti i campi', () => {
    expect(formUtils.checkForm()).toBeFalsy();
})

test('modifica della bio dell azienda', () => {
    expect(formUtils.checkForm("nuova bio azienda", () => { })).toBeTruthy();
})