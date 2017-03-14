import React , {Component} from 'react'
import {
    Tabs,
    Carousel
} from 'antd'
const TabPane = Tabs.TabPane


import MobileNewsBlock from './mobile_news_block'

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
class MobileNewsContainer extends Component{
    render(){
        return (
            <div>
                <div>
                    <Tabs>
                        <TabPane tab="头条" key="top">
                            {/*轮播图以及内容*/}
                            <Carousel autoplay>
                                <div><img src={carousel_1} alt="img"/></div>
                                <div><img src={carousel_2} alt="img"/></div>
                                <div><img src={carousel_3} alt="img"/></div>
                                <div><img src={carousel_4} alt="img"/></div>
                            </Carousel>
                            <MobileNewsBlock type="top" count={20}/>
                        </TabPane>
                        <TabPane tab="社会" key="shehui">
                            {/*内容*/}
                            <MobileNewsBlock type="shehui" count={20}/>
                        </TabPane>
                        <TabPane tab="国内" key="guonei">
                            {/*内容*/}
                            <MobileNewsBlock type="guonei" count={20}/>
                        </TabPane>
                        <TabPane tab="国际" key="guoji">
                            {/*内容*/}
                            <MobileNewsBlock type="guoji" count={20}/>
                        </TabPane>
                        <TabPane tab="娱乐" key="yule">
                            {/*内容*/}
                            <MobileNewsBlock type="yule" count={20}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default MobileNewsContainer
