import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
    auth: { user },
    profile: { loading, profile },
    getCurrentProfile,
    deleteAccount,
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    console.log('profile', profile);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"> Welcome {user && user.name}</i>
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={deleteAccount}>
                            <i className="fas fa-user-minus"></i>
                            Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    You have not yet setup a profile, please add some info!
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
