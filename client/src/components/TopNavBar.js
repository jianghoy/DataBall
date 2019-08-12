import React, {Component} from 'react';
import logo from '../assets/images/logo.svg'
//import '../styles/TopNavBar.css'

class TopNavBar extends Component {
    render () {
        return (
            <header className='App-header'>
                <img src = {logo} className='App-logo' alt = 'NBA'></img>
            </header>
        );
    }
}

export default TopNavBar