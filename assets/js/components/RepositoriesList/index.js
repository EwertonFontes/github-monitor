import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const RepositoriesList = (props) => {
  const {repositories} = props;
  return (
    <div>
      {repositories.length !== 0 && (
        <div>
          <hr />
          <h5 className="text-capitalize text-white">Repositórios</h5>
          <div className="list-group">
            {repositories.map((repository, index) => (
                <Link to={`/repository/${repository.id}`} className="" key={index}>{repository.name}</Link>
            ))};
          </div>
        </div>
      )}
    </div>
  );
};

RepositoriesList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepositoriesList;
