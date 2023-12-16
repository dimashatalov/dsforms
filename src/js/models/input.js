export default class Input {

    constructor(element) {
        this.el = element;
        this.args = {};

        
        this.onkeyup_tm = false;
        this.listenOnKeyUp();

    }


    listenOnKeyUp() {
        var self = this;

        if (this.el.getAttribute("data-onkeyup") == "false") {
            return false;
        }

        

        this.el.addEventListener("keyup", function() {

            if (self.onkeyup_tm == false) {
                clearTimeout(self.onkeyup_tm);
            }

            self.onkeyup_tm = setTimeout(function() {
                self.validate();
            }, 500);
            
        });
    }

    applyErrorClass() {
        this.el.classList.add("error");
        this.el.classList.add("error--" + this.get("lastErrorCode"));
        this.el.classList.remove("valid");

        // Let's see of there is container
        let containerID = this.el.getAttribute("data-container");

        if (containerID) {
            let cnt = document.getElementById(containerID);
            cnt.classList.add("error");
            cnt.classList.add("error--" + this.get("lastErrorCode"));
            cnt.classList.remove("valid");
        }
    }

    removeErrorClass() {
        this.el.classList.remove("error");
        this.el.classList.add("valid");

        // Let's see of there is container
        let containerID = this.el.getAttribute("data-container");
        var cnt = false;

        if (containerID) {
            cnt = document.getElementById(containerID);
            cnt.classList.remove("error");
            cnt.classList.add("valid");
        }        

        for (const className of this.el.classList) {
            
            if (className.startsWith('error')) {
                this.el.classList.remove(className);

                if (cnt != false) {
                    cnt.classList.remove(className);
                }
            }
        }

    }


    validate() {
        if (this.isValid() == false) {
            this.applyErrorClass();
            return false;
        }
        else {
            this.removeErrorClass();
            return true;
        }
    }

    isValid() {

        this.set("lastErrorCode", false);

        if (this.isRequired() == true && this.isEmpty() === true) {
            this.set("lastErrorCode", "required");
            return false;
        }


        if (this.isEmailValid() === false && this.isEmpty() === false) {

            this.set("lastErrorCode", "email");
            return false;
        }


        return true;
    }


    isEmailValid() {

        if (this.el.type != "email") {
            return true;
        }

        if (this.el.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            return true;
        }
        else {
            
            return false;
        }
    }

    isRequired() {
        
        if (this.el.getAttribute("data-required") == "1") {
            return true;
        }
        else {
            return false;
        }
    }

    isPasswordStrong() {

        if (this.el.type != "password") {
            return true;
        }

        const password = this.el.value;

        // Define your password strength criteria
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        // Check the criteria
        const isStrongPassword = (
          password.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialCharacter
        );
    
        // Output the result
        if (isStrongPassword) {
         return true;
        } else {
          return false;
        }        
    }

    isEmpty() {
        if (this.el.value == "") {
            return true;
        }
        else {
            return false;
        }
    }

    set(k, v) {
        this.args[k] = v;
    }


    get(k) {
        if (typeof this.args[k] == "undefined") {
            return false;
        }
        else {
            return this.args[k];
        }
    }

}