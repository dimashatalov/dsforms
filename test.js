
console.log("DS_Forms",DS_Forms.default);
    let form = new DS_Forms.default("my_form", {

        "messages_container" : ".messages",

        beforeSubmit: function(app) {
            console.log("beforeSubmit", app.get("inputs"));
            return true;
        },

        afterSubmit: function(app) {
            console.log("afterSubmit", app.get("inputs"));
            return false;
        }        
    });