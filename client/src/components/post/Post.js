import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getPost, addComment, deleteComment } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match, post: { post, loading }, getPost, addComment, deleteComment }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    const [text, setText] = useState('');
    console.log('post', post);
    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${post.user}`}>
                        <img className="round-img" src={post.avatar} alt="" />
                        <h4>{post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{post.text}</p>
                </div>
            </div>

            <CommentForm postId={post._id} />

            <div class="comments">
                {post.comments &&
                    post.comments.length &&
                    post.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = { post: PropTypes.object.isRequired, getPost: PropTypes.func.isRequired };

const mapStateToProps = state => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(Post);
