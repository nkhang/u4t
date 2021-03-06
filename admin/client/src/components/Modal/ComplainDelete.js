import React from 'react';
import {Modal, ModalFooter, Button, ModalHeader} from 'reactstrap';

class ComplainDelete extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = () => () => {
    console.log('submit...')
    this.props.toggle();
  }

  render(){
    return(
      <Modal returnFocusAfterClose isOpen={this.props.open} >
        <ModalHeader>Bạn có chắc muốn xóa này ?</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit()}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ComplainDelete;