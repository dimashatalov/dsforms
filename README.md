# DSForm doc
## Description
Script to process form and send request to server in very simple way.
#### Set required fields like this

    <input data-required="1"/>
#### Field with error

    <input data-required="1" class="error"/>
    
#### Form states

    <form class="loading">, <form class="done">
    
#### Error format form server

    { 
        status : "error",
        error_code : "requried", // Required, even if it does not fit error code ins.
        message : "Error message"
    }
    
#### Success

    { 
        status : "success",
        message : "Optional, will override js message"
    }
    
 #### Custom data send to server, which was not in form

    // Use beforeSubmit
    beforeSubmit = function() {
        let inputs = get("inputs");
        inputs.my_custom_field = "My custom field";
    }
    
#### Optional div where all errors and success messages will appear
    <div class="dsform_message"></div>
       
## Init
    let form = new DSForms("my_form_id", {});
# {} related to settings, which are following:

> All settings are optional

### submitUrl
> by default it takes form's action attribute. <form action="/">

    {submitUrl : "/"}

### auto
> script can detect required fields, password fields and check them. Also it can handle errors. Read about later below. By default it is true.

    {auto : false}

### doNotLock
> script can detect required fields, password fields and check them. Also it can handle errors. Read about later below. By default it is true.

    {doNotLock : true}    

#### beforeSubmit
    {beforeSubmit : function() {
        return true; // To continue form submit
        // return false; to break submit
    }
    
    
#### afterSubmit
    {afterSubmit : function(rsp) {
        // rsp - server response
        return true;  // everyting is ok
        // return false; stop automatic reaction to form submit
    }
    
### requestHeaders
    {
        requestHeaders: {
    			  'Accept': 'application/json',
    			  'Content-Type': 'application/json'
    			}
    }

### messages
    {
        messages: {
            "many_errors" : "You did not fill few required fields properly.",
            "password_confirmation" : "Please confirm password by repeating it in second password field",
            "email_validation" : "Email format is invald",
            "success" : "Form was submitted"
    			}
    }    