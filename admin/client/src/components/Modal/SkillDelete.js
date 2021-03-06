import React from 'react';
import {Button, Modal, ModalFooter, ModalHeader, Spinner} from 'reactstrap';
import {connect} from "react-redux";
import {deleteSkill} from "../../actions/skill.actions";

class SkillDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = async () => {
        try {
            this.setState({
                isLoading: true
            });
            const res = await this.props.deleteSkill({
                id: this.props.skill.id
            });
            this.setState(res);
            if (res.res) {
                this.props.toggle();
            }
        } catch (e) {
            console.log(e);
        } finally {
            console.log('done.');
            this.props.toggle();
            this.setState({
                isLoading: false
            })

        }
    };

    render() {
        const {isLoading} = this.state;
        return (
            <Modal returnFocusAfterClose isOpen={this.props.open}>
                <ModalHeader>Bạn có chắc muốn xóa skill {this.props.skill.name} này ?</ModalHeader>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={this.onSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> :
                            'Submit'
                        }
                    </Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    deleteSkill
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillDelete);
