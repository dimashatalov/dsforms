
import Events from "./models/events.js";
import Inputs from "./models/inputs.js";
import Submit from "./models/submit.js";
import Messages from "./models/messages.js";
 
export default class DS_Forms {

    constructor(id, settings) {
        this.args = {};

        this.applyDefaultSettings();
        this.applySettings(settings);
        this.set("id", id);

        this.findForm(id);
        this.events();
        this.inputs();

        this.Submit = new Submit(this);
        this.Messages = new Messages(this);
        
    }


    findForm(id) {
        this.set("form", document.getElementById(id));

        if (this.get("messages_container")) {
            this.set("messages_container", this.get("form").querySelector(this.get("messages_container")));
        }
    }

    events() {
        var self = this;

        this.get("form").Events = new Events(this,
            {
                onSubmit: function() {

                    if (self.get("lock") == true) {
                        return false;
                    }

                    self.set("lock", true);

                   

                    self.submit();

               
                }
            });
    }

    inputs() {
        this.get("form").Inputs = new Inputs(this);
    }

    beforeSubmit() {

        this.set("submitData", this.Submit.getSubmitData());

        if (this.get("beforeSubmit") != false) {
            this.get("beforeSubmit")(this);
        }

        this.checkInputsForErrors();

        this.formStatus("beforeSubmit");
    }

    submit() {
        var self = this;

        self.beforeSubmit();

        let errors = this.get("errors");

        if (errors === true) {
            self.afterSubmit(false);
            return false;
        }

        this.formStatus("submit");

        this.set("lock", true);

        this.Submit.submit(function(response) {
            self.afterSubmit(response);
        });
    }

    afterSubmit(response) {

        let errors = this.get("errors");
        
        if (errors === true) {
            this.formStatus("errors");
            this.displayMessage();
        }   
        else {
            this.displayMessage();
            this.formStatus("success");
        }   
        
        if (this.get("afterSubmit") != false) {
            this.get("afterSubmit")(this);
        }        

        this.set("lock", false);
    }


    formStatus(status) {

        this.set("lastFormStatus", status);

        for (const className of this.get("form").classList) {
            
            if (className.startsWith('status__')) {
                this.get("form").classList.remove(className);
            }
        }     
        
        this.get("form").classList.add("status__" + status);

    }

    applyDefaultSettings() {
        this.args = {
            "autoLock" : true,
            "submitUrl": "/",
            "messages_container" : "messages",
            "requestHeaders" : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        };
    }


    checkInputsForErrors() {
        if (this.get("form").Inputs.validate() === true) {
            
        }
        else {
             
        }
    }

    displayMessage() {
        
        let msg = this.Messages.getMessage("success");
        let errors = this.get("errors");

        if (errors === true) {
            msg = this.Messages.getMessage(this.get("lastErrorCode"));
        }
        

        this.get("messages_container").innerHTML = msg;

    }

    removeMessage() {
        this.get("messages_container").innerHTML = "";
    }


    applySettings(settings) {
        if (typeof settings == "undefined") {
            return false;
        }

        for (let i in settings) {
            this.set(i, settings[i]);
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
 
