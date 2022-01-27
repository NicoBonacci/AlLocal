var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function(fullName, email, password, confirmPassword, setError) {
  if (setError === undefined || setError === null) return false;
  if (fullName === '' || email === '' || password === '' ||  confirmPassword === "")  {
    setError('Please complete all fields to continue');
    return false;
  } else if (!re.test(email)){   
    setError('Please insert a valid email');
    return false;
  } else if (password !=  confirmPassword) {
    setError('Those passwords didn\'t match, try again');
    return false;
  } else if (password.length < 8) {
    setError('Your password must lenght at least 8 characters');
    return false;
  } else return true;
}