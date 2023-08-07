import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import RepositoriesList from '../components/RepositoriesList';

class RepositoriesListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getRepositories();
  }

  render() {
    const {repositories} = this.props;
    return (
      <div>
        <RepositoriesList repositories={repositories} />
      </div>
    );
  }
}

RepositoriesListContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  repositories: store.commitState.repositories,
});

export default connect(mapStateToProps)(RepositoriesListContainer);
