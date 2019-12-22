import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import ContractDetail from '../Modal/ContractDetail';
import ContractEdit from '../Modal/ContractEdit';
import ContractDelete from '../Modal/ContractDelete';

class ContractsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_detail: false,
            modal_edit: false,
            modal_delete: false,
        }
    }

    toggle = (modalType) => () => {
        switch (modalType) {
            case 'detail':
                this.setState({
                    modal_detail: !this.state.modal_detail
                })
                break;
            case 'edit':
                this.setState({
                    modal_edit: !this.state.modal_edit
                })
                break;
            case 'delete':
                this.setState({
                    modal_delete: !this.state.modal_delete
                })
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Contract name</th>
                            <th>Tutor</th>
                            <th>Learner</th>
                            <th>Price</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>name</td>
                            <td>Tutor</td>
                            <td>Learner</td>
                            <td>1.000.000</td>
                            <td>10/10/2010</td>
                            <td>10/11/2010</td>
                            <td>
                                <Button onClick={this.toggle('detail')}>Detail</Button>
                                <Button onClick={this.toggle('edit')}>Edit</Button>
                                <Button onClick={this.toggle('delete')}>Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <ContractDetail open={this.state.modal_detail} toggle={this.toggle('detail')}></ContractDetail>
                <ContractEdit open={this.state.modal_edit} toggle={this.toggle('edit')}></ContractEdit>
                <ContractDelete open={this.state.modal_delete} toggle={this.toggle('delete')}></ContractDelete>

            </div>
        );
    }
};

export default ContractsTable;