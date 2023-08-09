import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import Pagination from '../components/Pagination';

class CommitListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      listItems: [],
      page: 1,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: ''
    }
  }

  componentDidMount() {
      commitAPI.getCommits(this.state.page);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.repoID !== this.props.match.params.repoID || 
      prevProps.match.params.author !== this.props.match.params.author ||
      prevState.page !== this.state.page
    ) {

      if (prevProps.match.params !== this.props.match.params) {
        this.setState({page: 1})
      }

      if (this.props.match.params.repoID) {
        commitAPI.getCommitsByRepository(this.state.page, this.props.match.params.repoID)
      }
      else if (this.props.match.params.author) {
        commitAPI.getCommitsByAuthors(this.state.page, this.props.match.params.author)
      }
      else {
        commitAPI.getCommits(this.state.page);
      }
    }
  }

  onPageChanged (page) {
    this.setState ({ page: page })
  }

  render() {
    const {commits, total_pages} = this.props;
    return (
      <div>
        <CommitList commits={commits} />
        {
          commits.length > 0 ?
          <Pagination totalPages={total_pages} currentPage={this.state.page} maxVisibleButtons={ 3 } onPageChanged={ (e) => this.onPageChanged(e) }/> : <div />
        }
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  total_pages: PropTypes.number.isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  total_pages: store.commitState.total_pages
});

export default connect(mapStateToProps)(CommitListContainer);
