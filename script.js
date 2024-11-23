
//function to validate form
function validateForm(){
    let valid = true;

    // clear error messages
    document.getElementById('firstNameError').innerHTML = ''
    document.getElementById('lastNameError').innerHTML = ''
    document.getElementById('emailError').innerHTML = ''
    document.getElementById('passwordError').innerHTML = ''
    document.getElementById('confirmpasswordError').innerHTML = ''
    document.getElementById('ageError').innerHTML = ''
    document.getElementById('terms-checkboxError').innerHTML = ''

    // validate name
    let first_name = document.getElementById('f_name').value;
    if(first_name === ''){
        document.getElementById('firstNameError').innerHTML = 'Error! Name is required.'
        valid = false;
    }

    let last_name = document.getElementById('l_name').value;
    if(last_name === ''){
        document.getElementById('lastNameError').innerHTML = 'Error! Name is required.'
        valid = false;
    }

    // validate email
    let email = document.getElementById('email').value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    if(email === ''){
        document.getElementById('emailError').innerHTML = 'Error! Email is required.'
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerHTML = 'Error! Invalid email format.';
        valid = false;
    }

    // validate password
    let password = document.getElementById('password').value;
    if(password === ''){
        document.getElementById('passwordError').innerHTML = 'Error! Password is required.'
        valid = false;
    } else if (password.length < 8){
        document.getElementById('passwordError').innerHTML = 'Error! Password must be atleast 8 characters long'
        valid = false;
    }

    // validate confirm password
    let confirmpassword = document.getElementById('confirmpassword').value;
    if(confirmpassword === ''){
        document.getElementById('confirmpasswordError').innerHTML = 'Error! Confirm your password.'
        valid = false;
    } else if(confirmpassword != password){
        document.getElementById('confirmpasswordError').innerHTML = 'Error! Password does not match'
        valid = false;
    }

    //validate age
    let age = document.getElementById('age').value;
    if(age === ''){
        document.getElementById('ageError').innerHTML = 'Error! Age is required.'
        valid = false;
    } else if(isNaN(age) || age < 18){
        document.getElementById('ageError').innerHTML = 'Error! Age must be a number not less than 18.'
        valid = false;
    } else if(isNaN(age) || age > 100){
        document.getElementById('ageError').innerHTML = 'Error! Age must be a number less than 100.'
        valid = false;
    }

    //validate checkbox

    let termsCheckbox = document.getElementById('terms-checkbox');
    if(!termsCheckbox.checked) {
       document.getElementById('terms-checkboxError').innerHTML = 'Agree to the terms and conditions'
       valid = false;
    }

    //if all validation pass, form should be submitted
    if(valid){
        document.getElementById('firstNameError').innerHTML = '';
        document.getElementById('lastNameError').innerHTML = '';
        document.getElementById('emailError').innerHTML = '';
        document.getElementById('passwordError').innerHTML = '';
        document.getElementById('ageError').innerHTML = '';
        alert('Form Submitted Successfully')
    }
    return valid;
}

//patient registration
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault()
    if (!validateForm()) {
        return;
    }
    event.preventDefault();
    console.log("Form submitted");

    const first_name = document.getElementById('f_name').value;
    const last_name = document.getElementById('l_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //send data to server
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ first_name, last_name, email, password })
    });

    const data = await response.json();

    if(response.ok){
        alert('New user created!');
        //redirect
        window.location.href = '/home';
    } else {
        alert(data.message);
    }
});