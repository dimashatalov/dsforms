export default class Events {

    constructor(app) {
        this.app = app;
        this.args = {};

        this.listenSubmit();
    }

    listenSubmit() {
        let form = this.app.get("form");

        form.addEventListener("submit", function() {
            alert("Form Submit");
        });
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