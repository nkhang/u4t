import React from 'react';
import Page from '../components/Page';

class DashboardPage extends React.Component {
    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Page
                className="DashboardPage"
                title="Dashboard"
                breadcrumbs={[{name: 'Dashboard', active: true}]}
            >
            </Page>
        );
    }
}

export default DashboardPage;
