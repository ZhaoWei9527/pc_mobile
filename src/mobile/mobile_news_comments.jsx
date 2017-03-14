import React , {Component} from 'react'
import {Card , Input , Button , message} from 'antd'
import axios from 'axios'
class NewsComments extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments : []
        }
    }

    componentWillMount(){
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                console.log('执行到这里了么')
                console.log(response.data)
                const comments = response.data.map( item => {
                    return {
                        username:item.UserName,
                        time : item.datetime ,
                        comment : item.Comments
                    }
                })
                this.setState({comments})
            })
    }

    submitCollect = (isSubmit) => {
        if(isSubmit){
            if(localStorage.username && localStorage.userId){
                const action ='comment'
                const value = document.getElementById('commit').value
                console.log(value)
                const {username , userId} = localStorage
                const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&userid=${userId}&uniquekey=${this.props.newsId}&commnet=${value}`
                axios.get(url)
                    .then(response => {
                        if(response){
                            message.success('评论提交成功')
                            document.getElementById('commit').value =''
                            this.componentWillMount()
                        }else{
                            message.error('评论提交失败')
                        }
                    })
            }else{
                message.error('请前去登录')
                document.getElementById('commit').value =''
            }
        }else{
            //收藏
            if(localStorage.username && localStorage.userId){
                const action ='uc'
                const {username , userId} = localStorage
                const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&userid=${userId}&uniquekey=${this.props.newsId}`
                axios.get(url)
                    .then(response => {
                        if(response){
                            message.success('文章收藏成功')
                        }else{
                            message.error('文章收藏失败')
                        }
                    })
            }else{
                message.error('请前去登录')
            }
        }


    }
    render(){
        const {comments} = this.state
        const commentsList = comments.map( (item , index) => {
            return (
                <Card key={index} title={item.username} extra={item.time}>
                    <p>{item.comment}</p>
                </Card>
            )
        })
        return (
            <div style={{padding : '10px'}}>
                {commentsList}
                <br/>
                <div>
                    <Input type="textarea" id="commit"/>
                    <br/><br/>
                    <Button type="primary" onClick={this.submitCollect.bind(this , true)}>提交评论</Button>
                    <Button type="primary" onClick={this.submitCollect.bind(this , false)}>收藏文章</Button>
                </div>
            </div>
        )
    }
}
export default NewsComments