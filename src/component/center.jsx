//用户中心路由

import React , {Component} from 'react'
import axios from 'axios'
import {Row , Col , Tabs , Card , Modal , Icon , Upload} from 'antd'
import {Link} from 'react-router'
class UserCenter extends Component{
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
    componentWillMount(){
        const userId = localStorage.userId
        let collectionUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(collectionUrl)
            .then( response => {
                const collection = response.data
                ? (
                    response.data.map( (item , index) => {
                        return {
                            uniquekey : item.uniquekey ,
                            title : item.Title
                        }
                    })
                )
                : ('未加载到任意收藏')

                this.setState({collection})
        })

        let commentUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(commentUrl)
            .then(response => {
                const comments = response.data
                    ? (
                    response.data.map( (item , index) => {
                        return {
                            uniquekey : item.uniquekey ,
                            datetime : item.datetime ,
                            comment : item.Comments
                        }
                    })
                )
                    : ('未加载到任意评论')

                this.setState({comments})
            })

    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    render(){
        const {collection , comments} = this.state
        const TabPane = Tabs.TabPane
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const showCollection = collection.map( (item , index) =>{
            return (
                <Card
                    title={item.uniquekey}
                    extra={<Link to={`/news_detail/${item.uniquekey}`}
                    key={index}
                    >查看</Link>}>
                    <p>{item.title}</p>
                </Card>
            )
        })
        const commentsList = comments.map( (item , index) => {
            return (
                <Card
                    title={`于${item.datetime}评论${item.uniquekey}`}
                    extra={<Link to={`/news_detail/${item.uniquekey}`}
                    key={index}
                    >查看</Link>}>
                    <p>{item.comment}</p>
                </Card>
            )
        })
        return (
           <Row>
               <Col span={1}></Col>
               <Col span={22}>
                   <Tabs>
                       <TabPane tab="我的收藏列表" key="1">
                           {showCollection}
                       </TabPane>
                       <TabPane tab="我的评论列表" key="2">
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
               </Col>
               <Col span={1}></Col>
           </Row>
        )
    }
}


export default UserCenter