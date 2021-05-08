import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Icon,
  Label,

} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

import parse from 'html-react-parser';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [ comment, setComment ] = useState( '' );
  const seed = getRandomInt( 100 );

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
      <div className="single-post">
        
        <Button className="" animated color='teal' as={Link} to="/">
          <Button.Content visible>Back Home</Button.Content>
          <Button.Content hidden>
          <Icon name='home' />
          </Button.Content>
        </Button>
       
            <Card className="fluid ui raised very padded">
              <Card.Content className="card-content">
                <img className="avatar" src={ `https://avatars.dicebear.com/api/human/${ seed }.svg?background=%23222831` } alt="avatar"></img>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{ moment( createdAt ).fromNow() }</Card.Meta>
              
                <Card.Description>
                  <div className="single-post-page">
                       { parse( body ) }
                  </div>
               
                </Card.Description>
           
              </Card.Content>
        
              <Card.Content extra className="extra">
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Reply on question">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button color="teal">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="teal" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid className="comment-form">
                <Card.Content>
                  <p>Post Answer</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id} className="comment-form">
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
        
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
