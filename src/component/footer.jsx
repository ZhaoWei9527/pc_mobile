import React , {Component} from 'react'
import {Row,Col} from 'antd'
function Footer() {
    return (
        <Row className="footer">
            <Col span={1}></Col>
            <Col span={22}>
                <p>&copy;2016 ReactNews. All Rights Reserved.</p>
            </Col>
            <Col span={1}></Col>
        </Row>
    )
}

export default Footer