import React from 'react';
import './App.css';
import {useQuiz} from "./lib/useQuiz";
import {Button, Card, Col, Form, Image, Layout, List, Modal, Progress, Radio, Row, Typography} from 'antd'
import {params, questions} from "./data/pancakeQuiz";
import {Content, Header} from "antd/es/layout/layout";

function App() {
    const {onAnswerSubmit, answers, question, progress, isFinal, results} = useQuiz(params, questions)

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const [submittable, setSubmittable] = React.useState(false);

    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values]);


    const handleAnswerSubmit = (values: FormData) => {
        // @ts-ignore
        const {answer} = values
        onAnswerSubmit([answer])
        form.resetFields()
    }
    return (
        <Layout>
            <Header style={{color: '#fff'}}>
                {params.title}
            </Header>
            <Content>
                <Row gutter={16} style={{padding: 24}}>
                    <Col>
                        <Card style={{width: 360}}
                              cover={question.attachment ? <img alt={'cover'} src={question.attachment}/> : null}>
                            <Progress percent={progress * 100} showInfo={false}/>
                            <Typography.Title>
                                {question.text}
                            </Typography.Title>
                            <Form onFinish={handleAnswerSubmit}
                                  form={form}
                                  name="basic"
                                  style={{
                                      maxWidth: 600,
                                  }}>
                                <Form.Item name={'answer'} rules={[{required: true}]}>
                                    <Radio.Group>
                                        <List dataSource={answers}
                                              split={false}
                                              renderItem={(item, index) => (
                                                  <List.Item>
                                                      <Radio value={index}>
                                                          {item.text}
                                                      </Radio>
                                                  </List.Item>
                                              )}
                                        >
                                        </List>
                                    </Radio.Group>
                                </Form.Item>
                                <Button htmlType={'submit'}
                                        type={'primary'}
                                        disabled={!submittable}>{isFinal ? 'Показать результаты' : 'Далее'}</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Modal open={!!results}>
                <Image src={results?.image}/>
                <Typography.Title>Твой результат: {results?.title}</Typography.Title>
                <Typography.Text>{results?.description}</Typography.Text>
            </Modal>
        </Layout>

    );
}

export default App;
