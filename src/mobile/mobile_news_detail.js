import React , {Component} from 'react'
import axios from 'axios'
import NewsComments from './mobile_news_comments'
class MobileNewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            news : ''
        }
    }


    componentWillReceiveProps(nextProps){
        const {news_id} = nextProps.params
        console.log(news_id)
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${news_id}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})

            })
    }
    render(){
        const {news} = this.state

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                <br/>
                <hr/>
                <p>用户评论</p>
                <NewsComments newsId={this.props.params.news_id}/>
            </div>
        )
    }
}
export default MobileNewsDetail
