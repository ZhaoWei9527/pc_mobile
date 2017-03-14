import React , {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {
    Row ,
    Col ,
    Icon ,
    Menu ,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message



} from 'antd'
import logo from '../images/logo.png'
class NewsHeader extends Component{
        constructor(props){
            super(props)
            this.state = {
                currentKey : 'toutiao',
                username : null,
                userId : null,
                modalVisible : false
            }
        }
    componentWillMount(){
        //打开页面就读取保存的数据
        const userId = localStorage.userId
        const username = localStorage.username
        if(userId){
            this.setState({
                userId,
                username
            })
        }
    }
    clickItem = (event) => {
        const {key} = event
        this.setState({
            currentKey : key
        })
        if(key === "register"){
            this.setState({
                modalVisible : true
            })
        }

    }
    //登出
    logout = () => {
        //移除localStorage
        localStorage.userId = ''
        localStorage.username = ''
        this.setState({
            userId : null,
            username : null
        })
    }
    //bind,除了绑定this，还可以传入调用函数时的参数，实参
    //event永远是左后一个参数
    setModalVisible = (modalVisible , event) => {
        this.setState({modalVisible})
    }
    //处理注册/登录
    handleSubmit = (isRegister , event) => {
        //阻止表单的默认行为，提交后会跳转
        event.preventDefault()
        //收集输入数据，对着解构文档来编辑url
        const {username , password , r_userName , r_password , r_confirmPassword} = this.props.form.getFieldsValue()
        const action = isRegister ? 'register' : 'login'
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        axios.get(url)
            .then(response => {
                const result = response.data
                if(isRegister){
                    message.success('注册成功')
                }else{
                    if(!result){  //登录失败
                        message.error('登录失败')
                    }else{
                        message.success('登录成功')
                        this.setState({
                            userId : result.UserId,
                            username : result.NickUserName
                        })

                        localStorage.userId = result.UserId
                        localStorage.username = result.NickUserName
                    }
                }
            })
        this.setState({modalVisible : false})
    }

    render(){
        const MenuItem = Menu.Item
        const TabPane = Tabs.TabPane
        const FormItem = Form.Item
        const {currentKey , username , modalVisible} = this.state
        const {getFieldDecorator} = this.props.form
        const useritem = username
            ? (
                <MenuItem className="register" key="logout">
                    <Button type="primary">{username}</Button>
                    &nbsp;&nbsp;
                    <Link to="/user_center">
                        <Button type="dashed">个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="Ghost" onClick={this.logout}>退出</Button>
                </MenuItem>
                )
            : (
                <MenuItem className="register" key="register">
                    <Icon type="appstore"></Icon>
                    <span>注册/登录</span>
                </MenuItem>
                )
        return (
            <div>
                <Row gutter={24}>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </div>
                    </Col>
                    <Col span={19}>
                        {/*selectedKeys可以监视到每一个Item的变化*/}
        <Menu mode="horizontal" selectedKeys={[currentKey]} onClick={this.clickItem}>
            <MenuItem key="toutiao">
                                <Icon type="appstore"></Icon>
                                <span>头条</span>
                            </MenuItem >
                            <MenuItem key="shehui">
                                <Icon type="appstore"></Icon>
                                <span>社会</span>
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"></Icon>
                                <span>国内</span>
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"></Icon>
                                <span>国际</span>
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"></Icon>
                                <span>娱乐</span>
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"></Icon>
                                <span>体育</span>
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"></Icon>
                                <span>科技</span>
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"></Icon>
                                <span>时尚</span>
                            </MenuItem>
                            {useritem}
                        </Menu>
                        <Modal
                            title="个人中心"
                            visible={modalVisible}
                            onOk={this.setModalVisible.bind(this , false)}
                            onCancel={this.setModalVisible.bind(this , false)}
                            okText="关闭"
                        >
                            <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1" >
                                    <Form onSubmit={this.handleSubmit.bind(this , false)}>
                                        <FormItem label="账户">
                                            {
                                                getFieldDecorator('username')(
                                                    <Input placeholder="请输入用户名"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('password')(
                                                    <Input type="password" placeholder="请输入密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2" >
                                    <Form onSubmit={this.handleSubmit.bind(this , true)}>
                                        <FormItem label="账户">
                                            {
                                                getFieldDecorator('r_userName')(
                                                    <Input placeholder="请输入用户名"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('r_password')(
                                                    <Input type="password" placeholder="请输入密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="再次输入密码">
                                            {
                                                getFieldDecorator('r_confirmPassword')(
                                                    <Input type="password" placeholder="请输入密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}>

                    </Col>
                </Row>
            </div>
        )
    }
}
//这么包装以后，props里边就多了from这样一个对象，里边包含了我们的表单数据

//并且，这样暴露，并不会影响其他组件的使用，仅仅是我们可以获取到from表单里的
//数据了，向外暴露的是包含了NewsHeader的from对象

//from对象里边包含了许多我们可以使用的方法，比如getFieldDecorator来包装我们的
//表单项，这样一来，大概就是监视了每一个表单项的变化
export default Form.create({})(NewsHeader)
//this.props.form
//getFiledDecorator(): 这里我们用来包含input
//getFiledValue() :得到指定控件输入的数据
//resetFileds() 重置控件（就是form）的值，不传参就是所有