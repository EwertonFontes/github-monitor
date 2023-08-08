import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

class CommitListByRepoContainer extends React.Component {
  componentDidMount() {
      console.log(this.props.match.params.repoID)
      commitAPI.getCommitsByRepository(this.props.match.params.repoID);
  }

  render() {
    const {commits} = this.props;
    return (
      <div>
        <CommitList commits={commits} />
      </div>
    );
  }
}

CommitListByRepoContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
});

export default connect(mapStateToProps)(CommitListByRepoContainer);
