import React from 'react';

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import {isBlank, isInteger} from '../utils/CommonUtil'

import {Table, Form, Row, Col, Input, Button, message} from 'antd';

import {addUser, loadUsers} from '../actions/UserAction'
import {changeLocale} from '../actions/LocaleAction'

import {FormattedMessage, injectIntl} from 'react-intl'

const columns = [{
    title: <FormattedMessage id="label.name"/>,
    dataIndex: 'name',
}, {
    title: <FormattedMessage id="label.age"/>,
    dataIndex: 'age',
}, {
    title: <FormattedMessage id="label.address"/>,
    dataIndex: 'address',
}];

const INIT_PAGE_SIZE = 5;

class UserComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            age: '',
            address: '',
            page: 1,
            pageSize : INIT_PAGE_SIZE
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    addUser() {
        if (isBlank(this.state.name)) {
            message.error(this.props.intl.formatMessage({id: 'validate.nameIsEmpty'}));
            return;
        }

        if (isBlank(this.state.age)) {
            message.error(this.props.intl.formatMessage({id: 'validate.ageIsEmpty'}));
            return;
        }

        if (!isInteger(this.state.age)) {
            message.error(this.props.intl.formatMessage({id: 'validate.ageIsInvalid'}));
            return;
        }

        if (isBlank(this.state.address)) {
            message.error(this.props.intl.formatMessage({id: 'validate.addressIsEmpty'}));
            return;
        }

        this.props.addUser(this.state.name, parseInt(this.state.age || 0, 10), this.state.address).then(() => {
            this.setState({
                name: '',
                age: '',
                address: '',
                page: 1
            }, () => {
                this.loadUsers();
            });
        });
    }

    loadUsers() {

        let filters = {};

        if (!isBlank(this.state.name)) {
            filters.name = this.state.name;
        }

        if (!isBlank(this.state.age) && isInteger(this.state.age)) {
            filters.age = parseInt(this.state.age || 0, 10);
        }

        if (!isBlank(this.state.address)) {
            filters.address = this.state.address;
        }

        this.props.loadUsers(this.state.page, this.state.pageSize, filters);
    }

    changeLocale() {
        this.props.changeLocale();
    }

    render() {
        if (!isBlank(this.props.errMsg)) {
            message.error(this.props.errMsg);
        }
        let pagination = {
            onChange: (page) => this.setState({
                page: page
            }, () => this.loadUsers()),
            current: this.state.page,
            pageSize: this.state.pageSize,
            total: this.props.total,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '40'],
            onShowSizeChange: (page, pageSize) => this.setState({
                page: 1,
                pageSize: pageSize
            }, ()=> this.loadUsers())
        };
        let formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        return (
            <div className="panel panel-primary" style={{maxWidth: 800, margin: '10px auto 10px'}}>
                <div className="panel-heading">
                    Demo <Button onClick={() => this.changeLocale()}>{<FormattedMessage id="label.changeLocale"/>}</Button>
                </div>
                <div className="panel-body">
                    <Form
                        horizontal
                        style={{marginBottom: 15}}
                    >
                        <Row>
                            <Col span={8}>
                                <Form.Item {...formItemLayout} label={<FormattedMessage id="label.name"/>}>
                                    <Input type="text" value={this.state.name || ''}
                                           onChange={(e) => this.setState({name : e.target.value.trim()})}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item {...formItemLayout} label={<FormattedMessage id="label.age"/>}>
                                    <Input type="text" value={this.state.age || ''}
                                           onChange={(e) => this.setState({age : e.target.value.trim()})}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item {...formItemLayout} label={<FormattedMessage id="label.address"/>}>
                                    <Input type="text" value={this.state.address || ''}
                                           onChange={(e) => this.setState({address : e.target.value.trim()})}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}/>
                            <Col span={6}>
                                <Button type="primary" onClick={() => this.addUser()}
                                        style={{marginLeft: 10, marginRight: 10}}>{<FormattedMessage id="label.add"/>}</Button>
                                <Button type="primary" onClick={() => this.setState({page: 1}, () => this.loadUsers())}
                                        style={{marginLeft: 10, marginRight: 10}}>{<FormattedMessage id="label.search"/>}</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table dataSource={this.props.users} rowKey="id" columns={columns} pagination={pagination}
                           loading={this.props.loading}/>

                </div>
            </div>
        );
    }
}

//如果组件需要读取store里的状态或需要触发action，则需要用decorator方式注入必要的属性
export default connect(
    state => ({
        total: state.userState.total,
        users: state.userState.users,
        errMsg: state.userState.errMsg,
        loading: state.userState.loading
    }),
    dispatch => ({
        ...bindActionCreators({
            addUser,
            loadUsers,
            changeLocale
        }, dispatch)
    })
)(injectIntl(UserComponent));
