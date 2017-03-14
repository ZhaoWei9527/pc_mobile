import React , {Component} from 'react'
import {
    Card
} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
class NewsImageBlock extends Component{

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
                const newsArr = response.data.map( newsItem => {
                    return {title : newsItem.title ,
                            author_name : newsItem.author_name ,
                            image_url : newsItem.thumbnail_pic_s ,
                            newsId : newsItem.url ,
                            uniquekey : newsItem.uniquekey
                    }
                })

                this.setState({newsArr})
            })
    }
    render(){

        const {title , imageWidth , width  } = this.props
        const {newsArr} = this.state
        const imageStyle = {
            width : imageWidth,
            height : '90px'
        }
        const titleStyle = {
            width : imageWidth,
            whiteSpace : 'nowrap',
            overflow : 'hidden',
            textOverflow : 'ellipsis'
        }
        const newsList = newsArr.length
        ? (
            newsArr.map( (news , index) => (
                <div key={index} className="imageblock">
                    <Link to={`/news_detail/${news.uniquekey}`}>
                        <div>
                            <img src={news.image_url} style={imageStyle}/>
                        </div>
                        <div className="custom-card">
                            <h3 style={titleStyle}>{news.title}</h3>
                            <p>{news.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
        )
        : '未加载到任何数据'
        return (
            <div>
                <Card title={title}>
                    {newsList}
                </Card>
            </div>
        )
    }
}
export default NewsImageBlock