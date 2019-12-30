import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
    education: { school, degree, fieldofstudy, current, from, to, description },
}) => {
    return (
        <div>
            <h3 class="text-dark">{school}</h3>
            <p>
                <Moment format="DD.MM.YYYY">{from}</Moment> -{' '}
                {!to ? ' Now' : <Moment format="DD.MM.YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Degree: </strong>
                {degree}
            </p>
            <p>
                <strong>Field of Study: </strong>
                {fieldofstudy}
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

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
};

export default ProfileEducation;
