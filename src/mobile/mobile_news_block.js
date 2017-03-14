

import React , {Component} from 'react'
import {
    Card
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

class MobileNewsBlock extends Component{
    constructor(props){
        super(props)
        this.state = {
            newsArr : []
        }
    }

    componentWillMount(){
        const {type , count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then( response => {
                const newsArr = response.data.map(item => {
                    return {
                        title : item.title,
                        date : item.date ,
                        thumbnail_pic_s : item.thumbnail_pic_s ,
                        uniquekey : item.uniquekey ,
                        realtype : item.realtype
                    }
                })
                this.setState({newsArr})
            })
    }
    render(){
        const {newsArr} = this.state
        const newsList = newsArr.length
            ? newsArr.map((newsItem, index) => (
            <Card key={index} className="m_article list-item special_section clearfix">
                <Link to={`news_detail/${newsItem.uniquekey}`}>
                    <div className="m_article_img">
                        <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                    </div>
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{newsItem.title}</span>
                        </div>
                        <div className="m_article_desc clearfix">
                            <div className="m_article_desc_l">
                                <span className="m_article_channel">{newsItem.realtype}</span>
                                <span className="m_article_time">{newsItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        ))
            : '没有加载到任何新闻';
        return (
            <div style={{padding : '10px'}}>
                {newsList}
            </div>
        )
    }
}

export default MobileNewsBlock