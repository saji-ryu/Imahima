import * as React from 'react';


class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <h1 id="title">ログイン</h1>
                <a href="/oath/twitter">twitterログイン</a>
            </div>
        );
    }
}

export default Login;