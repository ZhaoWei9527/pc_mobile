//默认路由

import React , {Component} from 'react'
import {Link} from 'react-router'
import {
    Col,
    Row,
    Carousel,
    Tabs
} from 'antd'
import NewsImageBlock from './newsImageBlock'
import NewsBlock from './news_block'
import Product from './product'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
class NewsContainer extends Component{

    render(){
        const TabPane = Tabs.TabPane
        return (
            <div style={{marginTop : '10px'}}>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Row>
                            <Col span={7}>
                                {/*轮播图*/}
                                <Carousel autoplay infinite>
                                    <div><img src={carousel_1}/></div>
                                    <div><img src={carousel_2}/></div>
                                    <div><img src={carousel_3}/></div>
                                    <div><img src={carousel_4}/></div>
                                </Carousel>
                                {/*图片新闻*/}
                                <NewsImageBlock title='国际头条' count={6} type='top' width="400px" imageWidth="110px"/>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                {/*无图片新闻*/}
                                <Tabs className="tabs_news">
                                    <TabPane tab="体育新闻" key="1">
                                        <NewsBlock type="top" count={25} />
                                    </TabPane>
                                    <TabPane tab="科技新闻" key="2">
                                        <NewsBlock type="keji" count={25} />
                                    </TabPane>
                                </Tabs>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                {/*产品*/}
                                <Tabs className="tabs_news">
                                    <TabPane tab="ReactNews产品" key="1" >
                                        <Product />
                                    </TabPane>
                                </Tabs>

                            </Col>
                            <Col span={1}></Col>
                        </Row>

                        {/*长条新闻*/}
                        {/*第二个长条新闻*/}
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default NewsContainer