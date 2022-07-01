import { Select, Tag, Row, Col, Typography, DatePicker, Input, Button } from 'antd';
import { Container } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { statusFilterChange, clientFilterChange, searchFilterChange } from '../action/actions';

const { Search } = Input;

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

export default function Filters() {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterClient, setFilterClient] = useState('');


    const handleClear = () => {
        setFilterStatus('');
        setFilterClient('');
        setSearchText('');
        dispatch(statusFilterChange(''));
        dispatch(clientFilterChange(''));
        dispatch(searchFilterChange(''));
    }

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
        dispatch(searchFilterChange(e.target.value));
    };

    const handleStatusChange = (value) => {
        setFilterStatus(value);
        dispatch(statusFilterChange(value));
    }

    const handleClientChange = (value) => {
        setFilterClient(value);
        dispatch(clientFilterChange(value));
    }


    return (
        <>
            <Container>
                <Row justify="center">
                    <Col span={4}>
                        <Typography.Paragraph
                            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                        >
                            Status
                        </Typography.Paragraph>
                        <Select
                            mode='single'
                            //allowClear
                            placeholder='Status'
                            style={{ width: '100%' }}
                            value={filterStatus}
                            onChange={handleStatusChange}
                        >
                            <Select.Option value='Processing' label='Processing'>
                                <Tag color='yellow'>Processing</Tag>
                            </Select.Option>
                            <Select.Option value='Fulfilled' label='Fulfilled'>
                                <Tag color='green'>Fulfilled</Tag>
                            </Select.Option>
                            <Select.Option value='Pending' label='Pending'>
                                <Tag>Pending</Tag>
                            </Select.Option>
                            <Select.Option value='Received' label='Received'>
                                <Tag color='blue'>Received</Tag>
                            </Select.Option>
                            <Select.Option value='Canceled' label='Canceled'>
                                <Tag>Canceled</Tag>
                            </Select.Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Typography.Paragraph
                            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                        >
                            Client
                        </Typography.Paragraph>
                        <Select
                            mode='single'
                            //allowClear
                            placeholder='Client'
                            style={{ width: '100%' }}
                            value={filterClient}
                            onChange={handleClientChange}
                        >
                            <Select.Option value='client 1' label='client 1'>
                                <Tag>client 1</Tag>
                            </Select.Option>
                            <Select.Option value='client 2' label='client 2'>
                                <Tag>client 2</Tag>
                            </Select.Option>
                            <Select.Option value='client 3' label='client 3'>
                                <Tag>client 3</Tag>
                            </Select.Option>
                            <Select.Option value='client 4' label='client 4'>
                                <Tag>client 4</Tag>
                            </Select.Option>
                            <Select.Option value='client 5' label='client 5'>
                                <Tag>client 5</Tag>
                            </Select.Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Typography.Paragraph
                            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                        >
                            From
                        </Typography.Paragraph>
                        <DatePicker placeholder='From' />
                    </Col>
                    <Col span={4}>
                        <Typography.Paragraph
                            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                        >
                            To
                        </Typography.Paragraph>
                        <DatePicker placeholder='To' />
                    </Col>
                    <Col span={4}>
                        <Typography.Paragraph
                            style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                        >
                            Invoice#
                        </Typography.Paragraph>
                        <Search
                            placeholder='Search'
                            value={searchText}
                            onChange={handleSearchTextChange}
                        />
                    </Col>
                    <Col span={4}>
                        <Button style={{
                            position: 'absolute',
                            left: '15%', bottom: '0',
                            borderRadius: '10px',
                            color: 'blue'
                        }} onClick={<></>}>Apply</Button>
                        <Button style={{
                            position: 'absolute',
                            right: '5%', bottom: '0',
                            borderRadius: '10px',
                            color: 'red'
                        }} onClick={handleClear}>Clear</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
