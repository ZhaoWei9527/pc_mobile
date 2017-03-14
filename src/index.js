import React from 'react';
import ReactDOM from 'react-dom';
import {Router , Route , IndexRoute , hashHistory} from 'react-router'
import MediaQuery from 'react-responsive'
import App from './component/app'
import NewsContainer from './component/news_container'
import NewsDetail from './component/news_detail'
import UserCenter from './component/center'




import MobileApp from './mobile/mobile_app'
import MobileNewsContainer from './mobile/mobile_news_container'
import MobileNewsDetail from './mobile/mobile_news_detail'
import MobileUserCenter from './mobile/mobile_user_center'

ReactDOM.render(
    (
        <div>
            <MediaQuery query='(min-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={NewsContainer}></IndexRoute>
                        <Route path="/news_detail/:news_id" component={NewsDetail}></Route>
                        <Route path="/user_center" component={UserCenter}></Route>
                    </Route>
                </Router>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path="/" component={MobileApp}>
                        <IndexRoute component={MobileNewsContainer}></IndexRoute>
                        <Route path="/news_detail/:news_id" component={MobileNewsDetail}></Route>
                        <Route path="/user_center" component={MobileUserCenter}></Route>
                    </Route>
                </Router>
            </MediaQuery>
        </div>
    ),
  document.getElementById('root')
)

