
window.onload = function(){
    let formBtn = 
        <HTMLElement>document.querySelector("form > button");
    formBtn.onclick = main;
}

/**
 * Change the message heading to a random color
 * when it is clicked
 */
function changeHeading() {
    let heading = <HTMLElement>this;
    let red = Math.floor(Math.random() * 255 + 1);
    let green = Math.floor(Math.random() * 255 + 1);
    let blue = Math.floor(Math.random() * 255 + 1);
    let color = "rgb(" + red + "," + green + "," +
                    blue + ")";
    console.log(color);
    heading.style.color = color;
    console.log(heading.style.color);
}

function main():void {
    // adding a HTML element using TS/JS
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    let msgHeading = document.createElement("h2");
    msgHeading.innerText = "Processing form";
    msgHeading.setAttribute("class", "message");
    msgHeading.onclick = changeHeading;

    let h1 = document.querySelector("h1");
    h1.insertAdjacentElement("afterend", msgHeading);
    
    // https://www.w3schools.com/js/js_timing.asp
    setTimeout(function() {
        msgHeading.remove();
    }, 20000)

    resetErrorMessages();
    // javascript does not care if we pass in two parameter however typescript does and will give an error
    isTextPresent("first-name", "First name is required");
    isTextPresent("last-name", "Last name is required");

    // Validates date
    CheckValidDate();
}

function CheckValidDate() {
    let dobBox = <HTMLInputElement>document.getElementById("dob");
    let dob = dobBox.value;
    if (!isValidDate(dob)) {
        // let errSpan = dobBox.nextElementSibling;
        // errSpan.innerHTML = "Invalid format. Format should be mm/dd/yyyy";
        let errSpan = document.getElementById("dob-span");
        errSpan.innerHTML = "Format should be mm/dd/yyyy";
    }
}

function isValidDate(input:string):boolean {
    // Validating mm/dd/yyyy and m/d/yyyy, $ match one occurence
    // \d{1,2}\/\d{1,2}\/\d{4}
    let pattern = /\d{1,2}\/\d{1,2}\/\d{4}$/g
    return pattern.test(input);
}

/**
 * Resets all spans back to the default text
 */
function resetErrorMessages():void {
    let allSpans = document.querySelectorAll("form span");
    for( let i = 0; i < allSpans.length; i++ ) {
        let currSpan = <HTMLElement>allSpans[i];

        if(currSpan.hasAttribute("data-required")) {
            currSpan.innerText = "*";
        }
        else {
            /*
            if(currSpan.hasAttribute("data-default-error")) {
                let msg = currSpan.getAttribute("data-default-error");
                currSpan.innerText = msg;
            }
            else {
                currSpan.innerText = "";
            }
            */
            currSpan.innerText = "";
        }
    }
}

/**
 * Returns true if the textbox with the given id has
 * some text inside it
 * @param id The id of the <input type="text"> to validate
 * @param errMsg The message to display in the sibling span of 
 * the textbox
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let txtBox = 
        <HTMLInputElement>document.getElementById(id);
    let txtBoxValue = txtBox.value;
    if( txtBoxValue == "" ) {
        let errSpan = 
            <HTMLSpanElement>txtBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    else {
        return true;
    }
}

/* might use this for more practice.
function isEmailValid(email:string) {
    if( !email.includes( "@" ) )
}
*/
