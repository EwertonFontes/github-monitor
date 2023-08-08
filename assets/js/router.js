import React from 'react';
import {
    Link, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepositoriesListContainer from './containers/RepositoriesListContainer';
import CommitListByRepoContainer from './containers/CommitListByRepoContainer';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/">
                            Github Monitor
                        </Link>
                        <RepositoriesListContainer />
                    </li>
                </ul>
            </div>

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <RepoCreateContainer />
                    <Switch>
                        <Route path="/" exact component={CommitListContainer} />
                        <Route path='/repository/:repoID' name='repository' component={CommitListContainer} />
                        <Route path='/commits/:author' name='author' component={CommitListContainer} />
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);
