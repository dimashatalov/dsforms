export default class Submit {
    constructor(app) {
        this.app = app;
    }


    async submit(callback) {

        var response = false;

        
        try {
            let submitData = this.app.get("submitData");

            const rawResponse = await fetch(this.app.get("submitUrl"), {
                method: 'POST',
                headers: this.app.get("requestHeaders"),
                body: JSON.stringify(submitData)
            });
            
            response = await rawResponse.json();	

            this.validateResponse(response);
        }
        catch(e) {
            console.log(e);
        }


        callback(response);
    }

    validateResponse(response) {
        if (typeof response.status == "undefined") {
            return false;
        }

        if (typeof response.msg != "undefined") {
            this.app.set("lastServerMessage", response.msg);
        }          

        if (response.status == "error") {
            this.app.set("errors", true);

            if (typeof response.error_code != "undefined") {
                this.app.set("lastErrorCode", response.error_code);
            }
        }
        else 
        if (response.stauts == "success") {

        }
    }


    getSubmitData() {
		let formElements = Array.from(this.app.get("form").elements);

		let inputs = {};

		for (let i in formElements) {

			let element = formElements[i];
			let name = element.getAttribute("name");
			let val  = element.value;

			if (val == '')
				continue;

			inputs[name] = val;


		} 
        
        return inputs;
    }
}