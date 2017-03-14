import React , {Component} from 'react'
import {
    Icon ,
    Modal ,
    Tabs ,
    Form ,
    Input ,
    Button ,
    Menu,
    Dropdown ,
    message
} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
import logo from '../images/logo.png'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentKey : '3' ,
            loginVisible : false,
            isSuccess:false ,
            userId : null,
            username : null
        }
    }
    componentDidMount () {
        if(localStorage.userId) {
            this.setState({
                username: localStorage.username,
                userId: localStorage.userId,
                isSuccess : true
            })
        }
    }

    //登出
    logOut = (event) => {
        console.log(event.key)
        if(event.key === '3'){
            message.success('登出成功')
            this.setState({isSuccess : false})
            localStorage.setItem('userId' , '')
        }
    }
    //模态框的处理
    toggleModal = (isLogined) => {
        if(!isLogined){
            this.setState({loginVisible : true})
        }
    }
    handleOk = () => {
        this.setState({loginVisible : false})

    }
    //Form的处理
    toggleLogin = (isLogin , event) => {
            event.preventDefault()
            const {username , password , r_username , r_password , r_confirmPassword} = this.props.form.getFieldsValue()
            const action = isLogin ? 'login' : 'register'
            const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
            axios.get(url)
                .then( response => {
                    const result = response.data
                    if(!isLogin){
                        message.success('注册成功')

                    }else{
                        if(!result){  //登录失败
                            message.error('登录失败')
                        }else{
                            message.success('登录成功')

                            this.setState({
                                userId : result.UserId,
                                username : result.NickUserName ,
                                isSuccess : true
                            })

                            localStorage.userId = result.UserId
                            localStorage.username = result.NickUserName
                        }
                    }
                })
        this.props.form.resetFields()
        this.setState({loginVisible : false})
    }
    render(){
        const TabPane = Tabs.TabPane
        const FormItem = Form.Item
        const MenuItem = Menu.Item
        const {currentKey , isSuccess , userId , username} = this.state
        const {getFieldDecorator} =this.props.form
        const menu = (
            <Menu selectedKeys={[currentKey]} onClick={this.logOut}>
                <MenuItem key="0">
                    <p>{username}</p>
                </MenuItem>
                <MenuItem key="1">
                    <Link to="/user_center">用户中心</Link>
                </MenuItem>
                <Menu.Divider />
                <MenuItem key="3" >退出</MenuItem>
            </Menu>
        );

        const toggleIcon = isSuccess
        ? (
            <Dropdown overlay={menu} trigger={['click']}>
                <Icon type="down" onClick={this.toggleModal.bind(this ,true)}/>
            </Dropdown>
        )
        : (
            <Icon type="user" onClick={this.toggleModal.bind(this , false)}/>
        )
        return (
            <div id="mobileheader">
                    <header>
                        <div>
                            <Link to="/">
                                <img src={logo} alt="logo"/>
                                <span>ReactNews</span>
                            </Link>
                                {toggleIcon}
                        </div>

                        {/*模态框*/}
                        <Modal title="用户中心" visible={this.state.loginVisible}
                               onOk={this.handleOk} onCancel={this.handleOk}
                               wrapClassName="vertical-center-modal"
                        >
                            <Tabs defaultActiveKey="1" type="card" onTabClick={() => {this.props.form.resetFields()}}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.toggleLogin.bind(this , true)}>
                                        <FormItem
                                            label="账户"
                                        >
                                            {
                                                getFieldDecorator('username')(
                                                <Input placeholder="请输入您的账户"/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="密码"
                                        >
                                            {
                                                getFieldDecorator('password')(
                                                    <Input placeholder="请输入密码" type="password"/>
                                                )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.toggleLogin.bind(this , false)}>
                                    <FormItem
                                        label="账户"
                                    >
                                        {
                                            getFieldDecorator('r_username')(
                                                <Input placeholder="请输入您的账户"/>
                                            )}
                                    </FormItem>
                                    <FormItem
                                        label="密码"
                                    >
                                        {
                                            getFieldDecorator('r_password')(
                                                <Input placeholder="请输入密码" type="password"/>
                                            )}
                                    </FormItem>
                                    <FormItem
                                        label="密码"
                                    >
                                        {
                                            getFieldDecorator('r_confirmPassword')(
                                                <Input placeholder="再次输入密码" type="password"/>
                                            )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </header>
          </div>
        )
    }
}
export default Form.create({})(Header)
