import React , {Component} from 'react'
import axios from 'axios'
import {Card , Form , Input , Button , message , notification} from 'antd'

class NewsComments extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments : []
        }
    }


    componentWillMount () {
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                const comments = response.data.map( comment => {
                    return {
                        UserName : comment.UserName ,
                        Comment : comment.Comments ,
                        datetime : comment.datetime
                    }
                })
                this.setState({comments})
            })
    }

    Submit = (event) => {
        event.preventDefault()
        const userId = localStorage.userId
        if(!userId){
            message.warn('请先登录')
            return
        }
        const commit = this.props.form.getFieldValue('commit')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${this.props.newsId}&commnet=${commit}`
        axios.get(url)
            .then(response => {
                message.success('提交成功')
                this.componentWillMount()
                //清空输入
                this.props.form.resetFields()
            })
    }

    addCollection = () =>{
        const userId = localStorage.userId
        if(!userId){
            message.warn('请先登录')
            return
        }
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message : "ReactNews收藏",
                    description : '添加收藏成功啦！'
                })


            })
    }
    render(){
        const FormItem = Form.Item
        const {getFieldDecorator} = this.props.form
        const commentList = this.state.comments.map( (item , index) => {
            return (
                <Card title={item.UserName} extra={item.datetime} style={{ width: '100%'}}>
                    <p>{item.Comment}</p>
                </Card>
            )
        })
        return (
            <div>
                {commentList}
                <Form onSubmit={this.Submit}>
                    <FormItem label="您的评论">
                        {
                            getFieldDecorator('commit')(
                            <Input type="textarea"/>
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>
                    <Button type="primary" onClick={this.addCollection}>收藏该文章</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(NewsComments)