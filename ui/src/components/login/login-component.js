import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import * as API_CONST from '../../constants/api-constants';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

const LogInComponent = ({updateLogin}) => {

    const history = useHistory();
    const toast = useRef(null);

    const [user, updateUser] = useState('');
    const [password, updatePassword] = useState('');
    const [hideSubmit, updateHideSubmit] = useState(false);
    const [loginState, updateLoginState] = useState(false);

    
    useEffect(() => {
        updateLogin(loginState)
    }, [loginState]);


    function logIn(event) {
        event.preventDefault();
        console.log(user, password);
        updateHideSubmit(true);
        const payload = {
            user: user,
            password: password
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(options);
        const fetchPromise = fetch(API_CONST.LOGIN, options);
        fetchPromise.then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data?.code === 200) {
                    history.push('/dashboard');
                    toast.current.show(
                        {severity:'success', summary: 'Login Success', life: 5000}
                    );
                    updateLoginState(true);
                }
                toast.current.show(
                    {severity:'error', summary: 'Login Failed', detail: data?.message, life: 5000}
                );
                updateHideSubmit(false);
            });
        });
    }

    function isFormInValid() {
        return user == '' || password == '';
    }

    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={logIn} className="ml-5">
                <div id="userDiv" className="mb-2">
                    <label htmlFor="userInput" className="d-block">Username / Email *</label>
                    <InputText id="userInput" value={user} className="w-75"
                        onChange={(e) => updateUser(e.target.value)} />
                </div>
                <div id="passwordDiv" className="mb-2">
                    <label htmlFor="passwordInput" className="d-block">Password *</label>
                    <Password id="passwordInput" value={password} className="w-75"
                        onChange={(e) => updatePassword(e.target.value)} toggleMask
                        feedback={false} />
                </div>
                <div id="submitDiv">
                    <ProgressSpinner strokeWidth="5" style={{ width: '50px', height: '50px' }} className={hideSubmit ? "w-75" : "hidden"} />
                    <Button label="Log in" className={hideSubmit ? "hidden" : "w-75"} type="submit" disabled={isFormInValid()} />
                </div>
            </form>
        </div>
    );

}

export default LogInComponent;