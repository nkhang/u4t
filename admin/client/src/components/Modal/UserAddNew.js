import React from 'react';
import {connect} from "react-redux";

import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";

import {addUser} from "../../actions/user.actions";
import validateInput from "../../utils/validations/addNewUser";
import Avatar from "../Avatar";
import {cities} from "../../constants/cities";


class UserAddNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            avatarUrl: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            fullname: '',
            city: '',
            is_active: '1',
            sex: '0',
            role: '0',
            datas: [],
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    onChangeAvatar(event) {
        const image = event.target.files.length >= 1 ? event.target.files[0] : null;
        const imageUrl = image != null ? URL.createObjectURL(image) : '';
        this.setState({
            avatar: image,
            avatarUrl: imageUrl
        })
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        this.setState({
            errors: errors,
        });
        return isValid;
    }

    onSubmit = async () => {
        this.setState({
            isLoading: true
        });
        try {
            if (this.isValid()) {
                const _payload = {
                    ...{},
                    ...{
                        admin: this.state.role === '2' || this.state.role === '3',
                        data: {
                            avatar: null,
                            username: this.state.username,
                            password: this.state.password,
                            passwordConfirmation: this.state.passwordConfirmation,
                            email: this.state.email,
                            fullname: this.state.fullName,
                            city: this.state.city,
                            is_active: this.state.is_active,
                            sex: this.state.sex,
                            role: this.state.role,
                            datas: [],
                        }
                    }
                };
                console.log(_payload);
                console.log('submmit....');
                await this.props.addUser(_payload);
                this.props.toggle();
            }
        } catch (e) {
            console.log();
            this.setState({
                errors: {
                    connect: e.message
                }
            })
        } finally {
            this.setState({
                isLoading: false,
            });
            console.log('done.');
        }
    };

    render() {

        const {errors} = this.state;

        let itemsCity = cities.map((item) => {
            return (
                <option>{item}</option>
            )
        });

        return (
            <Modal returnFocusAfterClose isOpen={this.props.open} size="lg">
                <ModalHeader>
                    <h3>{errors.connect}</h3>
                    Add new user
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label sm={2}>Avatar</Label>
                            <Col sm={10}>
                                {this.state.avatar &&
                                <Avatar size={100} src={this.state.avatarUrl}></Avatar>
                                }
                                <Input type="file" name="avatar" placeholder="Avatar"
                                       onChange={this.onChangeAvatar}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input name="username" placeholder="Username"
                                       value={this.state.username}
                                       onChange={this.onChange}
                                       invalid={errors.username}/>
                                <FormFeedback>{errors.username}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={5}>
                                <Input type="password" name="password" placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.onChange}
                                       invalid={errors.password}/>
                                <FormFeedback>{errors.password}</FormFeedback>
                            </Col>
                            <Col sm={5}>
                                <Input type="password" name="passwordConfirmation" placeholder="Confirm password"
                                       value={this.state.passwordConfirmation}
                                       onChange={this.onChange}
                                       invalid={errors.passwordConfirmation}/>
                                <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.onChange}
                                       invalid={errors.email}/>
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Fullname</Label>
                            <Col sm={10}>
                                <Input name="fullname" placeholder="Fullname"
                                       value={this.state.fullName}
                                       onChange={this.onChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>City</Label>
                            <Col sm={10}>
                                <Input type="select" name="city" placeholder="City"
                                       value={this.state.city}
                                       onChange={this.onChange}>
                                    {itemsCity}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Status</Label>
                            <Col sm={10}>
                                <Input type="select" name="is_active" placeholder="status"
                                       value={this.state.is_active}
                                       onChange={this.onChange}>
                                    <option value={0}>Lock</option>
                                    <option value={1}>Active</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Sex</Label>
                            <Col sm={10}>
                                <Input type="select" name="sex" placeholder="Sex"
                                       value={this.state.sex}
                                       onChange={this.onChange}>
                                    <option value={0}>Female</option>
                                    <option value={1}>Male</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Role</Label>
                            <Col sm={10}>
                                <Input type="select" name="role" placeholder="Role"
                                       value={this.state.role}
                                       onChange={this.onChange}>
                                    <option value={0}>Learner</option>
                                    <option value={1}>Tutor</option>
                                    <option value={2}>Admin</option>
                                    <option value={3}>Root</option>
                                </Input>
                            </Col>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={this.onSubmit}
                            disabled={this.state.isLoading}
                    >Submit</Button>{' '}
                    <Button color="secondary"
                            onClick={this.props.toggle}
                            disabled={this.state.isLoading}
                    >Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapDispatchToProps = {
    addUser
};


export default connect(null, mapDispatchToProps)(UserAddNew);
