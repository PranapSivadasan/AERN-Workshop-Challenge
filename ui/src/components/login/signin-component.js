import React, { useState, useRef } from 'react';
import * as API_CONST from '../../constants/api-constants';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

const SignInComponent = () => {

    const toast = useRef(null);

    const [userName, updateUserName] = useState({ value: '', modified: false });
    const [password, updatePassword] = useState({ value: '', modified: false });
    const [email, updateEmail] = useState({ value: '', modified: false });
    const [hideSubmit, updateHideSubmit] = useState(false);

    function signIn(event) {
        event.preventDefault();
        updateHideSubmit(true);
        const payload = {
            name: userName.value,
            email_id: email.value,
            password: password.value
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const fetchPromise = fetch(API_CONST.REGISTER, options);
        fetchPromise.then((res) => {
            res.json().then((data) => {
                if (data.code === 489) {
                    toast.current.show(
                        { severity: 'error', summary: 'Registration Failed', detail: data?.message, life: 5000 }
                    );
                }
                if (data.code === 200) {
                    toast.current.show(
                        { severity: 'success', summary: 'Successfully Registered', detail: data?.message, life: 5000 }
                    );
                }
                resetForm();
                updateHideSubmit(false);
            });
        });
    }

    function resetForm() {
        updateUserName({ value: '', modified: false });
        updatePassword({ value: '', modified: false });
        updateEmail({ value: '', modified: false });
    }

    function validate(field) {
        switch (field) {
            case 'userName':
                return userName.value === '';
            case 'email':
                const emailRegex = new RegExp(/[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]+/);
                return !emailRegex.test(email.value);
            case 'password':
                return password.value === '';
        }
    }

    function isFormInvalid() {
        return !userName.modified || !email.modified || !password.modified || validate('userName') || validate('email') || validate('password');
    }

    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={signIn} className="ml-5">
                <div id="userNameDiv" className="mb-2">
                    <label htmlFor="userNameInput" className="d-block">Username *</label>
                    <InputText id="userNameInput" value={userName.value}
                        onChange={(e) => updateUserName({ value: e.target.value, modified: true })}
                        className={userName.modified && validate('userName') ? "p-invalid w-75" : "w-75"} />
                    <small id="userNameInvalid" className={userName.modified && validate('userName') ? "p-error d-block" : "hidden"}>Username is required.</small>
                </div>
                <div id="emailDiv" className="mb-2">
                    <label htmlFor="emailInput" className="d-block">Email *</label>
                    <InputText id="emailInput" value={email.value}
                        onChange={(e) => updateEmail({ value: e.target.value, modified: true })}
                        className={email.modified && validate('email') ? "p-invalid w-75" : "w-75"} />
                    <small id="emailInvalid" className={email.modified && validate('email') ? "d-block p-error" : "hidden"}>Enter a valid email.</small>
                </div>
                <div id="passwordDiv" className="mb-2">
                    <label htmlFor="passwordInput" className="d-block">Password *</label>
                    <Password id="passwordInput" value={password.value}
                        onChange={(e) => updatePassword({ value: e.target.value, modified: true })} 
                        feedback={false} className={password.modified && validate('password') ? "p-invalid w-75" : "w-75"} />
                    <small id="emailInvalid" className={password.modified && validate('password') ? "p-error d-block" : "hidden"}>Password is required.</small>
                </div>
                <div id="submitDiv">
                    <ProgressSpinner strokeWidth="5" style={{ width: '50px', height: '50px' }} className={hideSubmit ? "w-75" : "hidden"} />
                    <Button label="Register" className={hideSubmit ? "hidden" : "w-75"} type="submit" disabled={isFormInvalid()} />
                </div>
            </form>
        </div>
    );

}

export default SignInComponent;