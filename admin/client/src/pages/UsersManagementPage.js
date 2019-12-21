import React from 'react';
import Page from '../components/Page';
import UsersManagementTabs from "../components/Tab/UsersManagementTabs";
import PaginationUser from '../components/Paginattion/PaginationUser';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

class UsersManagementPage extends React.Component {
    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Page
                className="UserManagementPage"
                title="User"
                breadcrumbs={[{ name: 'Management', active: true }]}
            >
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <UsersManagementTabs></UsersManagementTabs>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center flex-column">
                        <PaginationUser></PaginationUser>
                    </Col>
                </Row>

            </Page>
        );
    }
}

export default UsersManagementPage;
