import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const v = values.name.split('/');
    const data = {"name": v[1], "user": v[0]};
    return commitAPI.createRepository(data, {'X-CSRFToken': token}, dispatch);
  };

  render() {
    const {successMessage, errorMessage} = this.props;
    return <Form onSubmit={this.submit} successMessage={successMessage} errorMessage={errorMessage} />;
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired
};

const mapStateToProps = store => ({
  successMessage: store.commitState.successMessage,
  errorMessage: store.commitState.errorMessage
});

export default connect(mapStateToProps)(RepoCreateContainer);
