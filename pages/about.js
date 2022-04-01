import { Button, Divider, Form, Header, Input, List, TextArea } from "semantic-ui-react";

export default function About(){
    return (
        <div  style={{marginLeft : 10, marginRight:10}}>
            <Header as = "h3" style={{paddingTop : 40}} color = "blue">
                편집자 정보 : OOO,OOO,OOO
            </Header>
            <Divider/>
            <List>
                <List.Item>KIT</List.Item>
                <List.Item>학년 : ?</List.Item>
            </List>

            <Header as = "h3" style={{paddingTop : 40}} color = "blue">
                문의사항
            </Header>
            <Divider/>
            <Form>
                <Form.Field>
                    <label>제목</label>
                    <Input/>
                </Form.Field>

                <Form.Field>
                    <label>내용</label>
                    <TextArea/>
                </Form.Field>

                <Button color = "orange">보내기</Button>
            </Form>

            <Header as = "h3" style={{paddingTop : 40}} color = "black">
                기타
            </Header>
            <Divider/>
        </div>
    )
}