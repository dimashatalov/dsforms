function DSForms(formID, settings)
{
    var args = {};

    var messages = {
        "many_errors" : "You did not fill few required fields properly.",
        "password_confirmation" : "Please confirm password by repeating it in second password field",
        "email_validation" : "Email format is invald",
        "success" : "Form was submitted"
    }

    var formIsLocked = false;
    
    const construct = function() {

        settings.get = get;
        settings.set = set;

        if (typeof settings.auto == "undefined")
            settings.auto = true;

        findFormObject();    
        detectSubmitUrl();
        detectRequestHeaders();


        Events.listen();
        
    }

    const findFormObject = function() {
        let formObj = document.getElementById(formID);
        if (!formObj) {
            console.error("no form", formID);
        }

        set("formObj", formObj);
    }

    const onSubmit = async function() {

        if (formIsLocked === true) return false;
        formIsLocked = true;

        set("errors", []);

        getInputs();

        if (typeof settings.beforeSubmit != "undefined") {
            if (settings.beforeSubmit() === false) {
                formIsLocked = false;
                return false;
            }
                
        }

        if (settings.auto == true) {
            if ( AutoHelper.checkKnownInputs() === false) {
                formIsLocked = false;
                displayErrors();
                return false;
            }
        }
        sendData();
    }

    const getInputs = function() {
		let formElements = Array.from(get("formObj").elements);

		let inputs = {};

		for (let i in formElements) {

			let element = formElements[i];
			let name = element.getAttribute("name");
			let val  = element.value;

			if (val == '')
				continue;

			inputs[name] = val;


		}

		set("inputs", inputs);
    }


	const sendData = async function() {

		let inputs = get("inputs");

		setStatus("loading");

		const rawResponse = await fetch(get("submitUrl"), {
			method: 'POST',
			headers: get("requestHeaders"),
			body: JSON.stringify(inputs)
		});
		
		const content = await rawResponse.json();		

        if (typeof settings.afterSubmit != "undefined") {
            if (settings.afterSubmit(content) === false)
                return false;
        }
        
        displayResult(content);
        setStatus("done");

        
	}

	const setStatus = function(status) {
		
		if(get("oldStatus") !== false)
			document.getElementById(formID).classList.remove(get("oldStatus"));

		document.getElementById(formID).classList.add(status);

		set("oldStatus", status);
	}


    const displayResult = function(resp) {

        if (resp.status == "error") {
            if (typeof resp.error_code != "undefined") {
                addError(resp);
                displayErrors();
                formIsLocked = false;
            }
        }
        else if (resp.status == "success") {
            showSuccess(resp);  
            if (typeof settings.doNotLock != "undefined" && settings.doNotLock == true) {
                formIsLocked = false;
            }
            else 
                formIsLocked = true;
        }

        console.log("result");
    }

    const displayErrors = function() {
        let errors = get("errors");

        if (errors.length === 0)
            return false;

        let message = '';

        if (errors.length > 1) {
            message = messages.many_errors;
        }
        else
        if (errors.length === 1) {
            if (typeof errors[0].message != "undefined")
                message = errors[0].message;
            else 
                message = messages[errors[0].error_code];
        }

        let html = '<div class="dsform_error">' + message + '</div>';

        let form = get("formObj");
        form.getElementsByClassName("dsform_message")[0].innerHTML = html;
    }

    const showSuccess = function(rsp) {
        let form = get("formObj");
        let msg = messages.success;

        if (typeof rsp.message != "undefined" && rsp.message != '') 
            msg = rsp.message;

        form.getElementsByClassName("dsform_message")[0].innerHTML = '<div class="dsform_success">'+msg+'</div>';
    }

    const detectSubmitUrl = function(){
        if (typeof settings.submitUrl != "undefined") {
            set("submitUrl", settings.submitUrl);
        }
        else {
            set("submitUrl", get("formObj").getAttribute("action"));
        }
    }

    const detectRequestHeaders = function() {
        if (typeof settings.headers != "undefined") {
            set("requestHeaders", settings.headers);
        }
        else  {
            set("requestHeaders", {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              });
        }
    }

    const addError = function(error) {
        let errors = get("errors");
        errors.push(error);
        set("errors", errors);
    }

    const set = function(k, v) {
        args[k] = v;
    }
    
    const get = function(k) {
        if (typeof args[k] === "underfined") {
            return false;
        }
        return args[k];
    }


    const Events = new (function() {

        this.listen = function() {
            get("formObj").addEventListener("submit", submit);
            
        }

        this.submit = function(e) {
            e.preventDefault();
            onSubmit();
            
        }

        let submit = this.submit.bind(this);

        this.dontListen = function() {
            get("formObj").removeEventListener("submit",submit);
        }
    })();


    const AutoHelper = new (function() {
        this.checkKnownInputs = function() {

            let isValid = true;

            if (checkRequired() === false) {
                addError({ 
                    status : "error",
                    error_code : "requried"
                });

                isValid = false;
            } 
        
            if (checkEmail() === false) {
                addError({ 
                    status : "error",
                    error_code : "email_validation"
                });

                isValid = false;
            }
            
            if (checkPasswords() === false) {
                addError({ 
                    status : "error",
                    error_code : "password_confirmation"
                });

                isValid = false;
            }

            return isValid;

           
        }


        const checkRequired = function() {
            let formElements = Array.from(get("formObj").elements);
            console.log("formElements",formElements);
            
            let isValid = true;

            formElements.map(function(element) {
                let required = element.getAttribute("data-required");
                let val = element.value;

                if (val) {
                    element.classList.remove("error");
                }
                else
                if (required === "1") {
                    element.classList.add("error");
                    isValid = false;
                }
            });
        }

        const checkPasswords = function() {
            let password1 = false;
            let password2 = false;
            let password2_element = false;

            let formElements = Array.from(get("formObj").elements);
            console.log("formElements",formElements);
            
            let isValid = false;

            formElements.map(function(element) {
                let type = element.getAttribute("type");
                let name = element.getAttribute("name");
                let val  = element.value;


                if (type === "password" && name == "password") {
                    password1 = val;
                }

                if (type === "password" && name == "password2") {
                    password2 = val;
                    password2_element = element;
                }                

                if (password1 != false && password2 != false)
                    return true;
            });

            // needed fields dose not exists
            if (password1 === false || password2 === false) {
                return true;
            }

            if (password1 === password2) {
                password2_element.classList.remove("error");
                return true;
            }
            else {
                password2_element.classList.add("error");
                return false;
            }

        }

        const checkEmail = function() {
            let formElements = Array.from(get("formObj").elements);

            let isValid = true;

            formElements.map(function(element) {

                let type = element.getAttribute("type");
                let val  = element.value;
                let required = element.getAttribute("data-required");

                if (type === "email" && required === "1") {
                    
                    

                    if (val.match(
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )) {
                        isValid = true;
                        console.log("val true", val);
                    }
                    else {
                        isValid = false;
                        element.classList.add("error");
                    }
                    
                    
                }
                
            });

            return isValid;

        }
    });


    construct();
}