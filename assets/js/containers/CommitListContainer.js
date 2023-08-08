import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

class CommitListContainer extends React.Component {
  componentDidMount() {
      commitAPI.getCommits();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      console.log(this.props.match.params.repoID)
      if (this.props.match.params.repoID) {
        commitAPI.getCommitsByRepository(this.props.match.params.repoID)
      }
      else if (this.props.match.params.author) {
        commitAPI.getCommitsByAuthors(this.props.match.params.author)
      }
      else {
        commitAPI.getCommits();
      }
    } 
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

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
});

export default connect(mapStateToProps)(CommitListContainer);
