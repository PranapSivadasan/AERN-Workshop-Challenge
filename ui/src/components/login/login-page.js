import React from 'react';
import '../../css/login.css';

import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import LogInComponent from './login-component';
import SignInComponent from './signin-component';

const LoginPage = ({ changeLogin }) => {
    return (

        <div className="login-bg">
            <div className="login-card-div">
                <Card className="login-card">
                    <div className="mb-3 login-header">
                        <img
                            alt=""
                            src="night-owl.svg"
                            height="35"
                        />
                        <span className="ml-3">Welcome to Night Owl</span>
                    </div>
                    <TabView>
                        <TabPanel header="Login">
                            <LogInComponent updateLogin={(val) => { changeLogin(val) }}></LogInComponent>
                        </TabPanel>
                        <TabPanel header="Register">
                            <SignInComponent></SignInComponent>
                        </TabPanel>
                    </TabView>

                </Card>
            </div>
        </div>
    );
}

export default LoginPage;