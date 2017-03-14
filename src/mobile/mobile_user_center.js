import React , {Component} from 'react'
import {
    Card ,
    Tabs ,
    Upload ,
    Icon ,
    Modal
} from 'antd'
const TabPane = Tabs.TabPane
import axios from 'axios'
import {Link} from 'react-router'
class MobileUserCenter extends Component{
    constructor(props){
        super(props)
        this.state = {
            collection : [],
            comments : [] ,
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    componentWillMount(){
        const userId = localStorage.userId
        const username = localStorage.username
        //评论列表
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const comments = response.data.map( item => {
                    return {
                        newsId : item.uniquekey,
                        comment : item.Comments ,
                        time : item.datetime
                    }
                })
                this.setState({comments})
            })
        const collectionUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(collectionUrl)
            .then(response => {
                const collection = response.data.map( item => {
                    return {
                        newsId : item.uniquekey ,
                        title : item.Title
                    }
                })
                this.setState({collection})
            })
    }

    render(){
        const { previewVisible, previewImage, fileList } = this.state
        const {comments , collection} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const commentsList = comments.map( (item , index) => {
            return (
                <Card key={index} extra={<Link to={`/news_detail/${item.newsId}`}>查看</Link>} title={`于${item.time}`}>
                    {item.comment}
                </Card>
            )
        })
        const collectionList = collection.map( (item , index) => {
            return (
                <Card key={index} extra={<Link to={`/news_detail/${item.newsId}`}>查看</Link>} title={item.newsId}>
                    {item.title}
                </Card>
            )
        })
        return (
            <div style={{padding : '10px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="我的收藏列表" key="1">
                        {collectionList}
                    </TabPane>
                    <TabPane tab="我的评论了列表" key="2">
                        {commentsList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3">
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default MobileUserCenter