import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UserProfile from './components/user_profile';
import Login from './components/login';
import List from './components/list';
import 'public/css/style.css';


class Index extends React.Component{

    public render(){

        return(
            <React.Fragment>

            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root') as HTMLElement
);

