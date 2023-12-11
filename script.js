/*
 * Handles the load event of each page
 */
function load() {
    const backgroundImage = new Image();
    backgroundImage.src = "images/background.png";
    if (document.getElementById("contactForm")) {
        hideErrors();

        document.getElementById("contactForm").addEventListener("submit", validate);
        document.getElementById("contactForm").reset();
        document.getElementById("contactForm").addEventListener("reset", resetForm);
    }

    let navBar = document.getElementsByTagName('nav')[0];
    let navList = document.getElementById('navList');
    let navTitle = document.getElementById('navTitle');

   /*
    * Handles the mouse over event for the navbar
    *
    * param e  A reference to the event object
    */
    navBar.addEventListener('mouseover', function (e) {
        if(this.clientWidth<= 767){
            setTimeout(function () {
                navList.style.transform = 'translateX(5%)';
                navTitle.style.transform= 'translateX(500%)';
            }, 100);
        } else {
            setTimeout(function () {
                navList.style.transform = 'translateX(50%)';
                navTitle.style.transform= 'translateX(500%)';
            }, 100);
        }
    });

   /*
    * Handles the mouse leave event for the navbar
    *
    * param e  A reference to the event object
    */
    navBar.addEventListener('mouseleave', function (e) {
        setTimeout(function () {
            navList.style.transform = 'translateX(-500%)';
            navTitle.style.transform= 'translateX(0%)';
        }, 100);
    });
}

/*
* Does the checks for empty inputs
*
* param fieldElement the page element to be valued
*
* return true if has input; false if empty
*/
function formFieldHasInput(fieldElement) {
	let inputCheck = true;

	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		inputCheck = false;
	}

	return inputCheck;
}

/*
* Does the error flag check for the web pages
*
* return false if no error; true if error, display error elements
*/
function formHasErrors() {
	let errorFlag = false;

	let requiredFields = ["name","phone","email","comments"];

	for(let i=0; i<requiredFields.length; i++) {
		let textField = document.getElementById(requiredFields[i]);

		if(!formFieldHasInput(textField)) {
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
				if(!errorFlag) {
					textField.focus();
					textField.select();
				}

				errorFlag = true;
		}
	}

	// Use regular expression to pattern match 10 digits with or without hyphens
	let phoneNumberCheck = new RegExp(/^(?:\d{10}|(\d{3}-){2}\d{4})$/);
	let phoneInput = document.getElementById("phone").value;
	// Test with regex to input value
	if(!phoneNumberCheck.test(phoneInput)) {
		// If test fails display error
		document.getElementById("phoneformat_error").style.display = "block";	
		// Focus element
		if(!errorFlag) { 
			document.getElementById("postal").focus();
			document.getElementById("postal").select();
		}

		// Raise error flag
		errorFlag = true;
	}

	// Use regular expression to test email pattern
	let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/);
	let emailInput = document.getElementById("email").value;
	// Test with regex for pattern match
	if(!emailCheck.test(emailInput)) {
		// If failed focus input and show error
		document.getElementById("emailformat_error").style.display = "block";
		// Focus element
		if(!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise error flag
		errorFlag = true;
	}

	return errorFlag
}

/*
 * Handles the submit event of the contact form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
    // Hides all error elements on the page
    hideErrors();

    let isValid = true;

    // Determine if the form has errors
    if (formHasErrors()) {
        // Prevents the form from submitting
        e.preventDefault();

        // When using onSubmit="validate()" in markup, returning false would prevent
        // the form from submitting
        isValid = false;
    }

    // When using onSubmit="validate()" in markup, returning true would allow
    // the form to submit
    return isValid;
}

/*
 * Hides all error elements
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validateForm() {
    // Your validation logic goes here
    let isValid = true;

    // Example: Check if the name field is empty
    let nameField = document.getElementById('name');
    let nameError = document.getElementById('name_error');
    if (nameField.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Add more validation for other fields

    return isValid;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
    // Confirm that the user wants to reset the form.
    if (confirm('Clear order?')) {
        // Ensure all error fields are hidden
        hideErrors();

        // Reset the form using the browser reset
        document.getElementById("contactForm").reset();

        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();

    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);