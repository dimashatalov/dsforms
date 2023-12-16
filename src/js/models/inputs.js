import Input from "./input.js";

export default class Inputs {

    constructor(app) {
        this.app = app;
        this.args = {};

        
        this.inputs = [];

        this.findInputs();
    }

    findInputs() {
       
        let form = this.app.get("form");

        for (let element of form.elements) {
           
            element.model = new Input(element);
        }

    }

    validate() {

        this.app.set("errors", false);
        let form = this.app.get("form");

        let errorsArray = [];
        let errors = 0;

        for (let element of form.elements) {
          
            if (element.model.validate() === false) {
                this.app.set("lastErrorCode", element.model.get("lastErrorCode"));
                errorsArray.push(element);
                errors++;
            }
        }

        if (errors > 1) {
            this.app.set("lastErrorCode", "many_errors");
        }

        this.set("errorsArray", errorsArray);

        if (errors > 0) {
            this.app.set("errors", true);
            return false;
        }
        else {
            this.app.set("errors", false);
            return true;
        }
    }

    checkRequired() {
        let form = this.app.get("form");
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