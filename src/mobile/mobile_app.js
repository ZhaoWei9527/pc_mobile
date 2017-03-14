import React , {Component} from 'react'
import Header from './header'
import Footer from './footer'
import '../mobile.css'
class MobileApp extends Component{
    render(){
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer/>
            </div>

    )
    }
}
export default MobileApp
