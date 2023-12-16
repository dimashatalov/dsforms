export default class Messages {

    constructor(app) {
        this.app = app;
        
        this.locale = this.app.get("locale");

        this.buildMessages();

        let messages = this.app.get("messages");

        for (let i in messages) {
            this.messages[i] = messages[i];
        }
    }


    getMessage(code) {
        if (typeof this.messages[code] == "undefined") {
            return "No code : " + code;
        }
        else {
            return this.messages[code];
        }
    }



    buildMessages() {
 
        this.messages = {
            "many_errors" : "It looks like there are errors in the form. Please review and correct them.",
            "email"       : "the email address you entered seems to be invalid. Please double-check.",
            "required"    : "You missed some required fields. Please fill them in.",
            "success"     : "Your form has been successfully submitted."
        };
    }

 
 
}