import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Profile extends React.Component {
    render() {
        return (
            <div className="user_profile">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

