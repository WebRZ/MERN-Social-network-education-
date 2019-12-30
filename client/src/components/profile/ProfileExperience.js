import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
    experience: { company, title, location, current, from, to, description },
}) => {
    return (
        <div>
            <h3 class="text-dark">{company}</h3>
            <p>
                <Moment format="DD.MM.YYYY">{from}</Moment> -{' '}
                {!to ? ' Now' : <Moment format="DD.MM.YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong>
                {title}
            </p>
            <p>
                {description && (
                    <Fragment>
                        <strong>Description: </strong> {description}
                    </Fragment>
                )}
            </p>
        </div>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
