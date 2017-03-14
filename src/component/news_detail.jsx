//新闻详情路由
import React , {Component} from 'react'
import {
    Col,
    Row,
    BackTop
} from 'antd'
import NewsComments from './news_comments'
import NewsImageBlock from './newsImageBlock'
import axios from 'axios'
class NewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            news : ''
        }
    }

    componentWillMount () {
        this.showDetail(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps)
    }
    showDetail = (props) => {
        const uniquekey = props.params.news_id
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
            })
    }
    render(){
        return (
            <div>
                <Row gutter={24}>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div className="container">
                            <div dangerouslySetInnerHTML={{__html:this.state.news.pagecontent}}></div>
                            <br/>
                            <NewsComments newsId={this.props.params.news_id}/>
                        </div>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type="top" count={20} title="相关新闻" imageWidth='150px' width='100%'/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default NewsDetail