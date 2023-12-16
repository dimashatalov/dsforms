export default class Events {

    constructor(app, settings) {
        this.app = app;
        this.args = {};
        this.applySettings(settings);
        this.listenSubmit();
    }

    listenSubmit() {
        var self = this;

        let form = this.app.get("form");

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            let onSubmit = self.get("onSubmit");
            

            if (onSubmit != false) {
                onSubmit();
            }
        });
    }


    applySettings(settings) {
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