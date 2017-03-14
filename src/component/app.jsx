//根路由
import React , {Component} from 'react'
import {Link} from 'react-router'
import NewsHeader from './header'
import Footer from './footer'
import '../index.css'
class App extends Component{
    render(){
        return (
            <div>
                <NewsHeader />
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
export default App