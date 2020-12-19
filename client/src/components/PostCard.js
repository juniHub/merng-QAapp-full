import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

import Avatar from 'react-avatar';
import parse from 'html-react-parser';


function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="content-post">
     <Card fluid>
      
      <Card.Content>
        <Avatar className="avatar" size={ 40 } round={true} name={username }/>
        <Card.Header>{username}</Card.Header>
        <Card.Meta >
          {moment(createdAt).fromNow(true)}
          </Card.Meta>
        
        <Card.Description>
            <div className="home-post-page">
            { parse( body ) }
            </div>
        </Card.Description>
         
      <Button className="show-button" animated basic color='green' as={Link} to={`/posts/${id}`}>
      <Button.Content visible>Show More</Button.Content>
      <Button.Content hidden>
        <Icon name='eye' />
      </Button.Content>
    </Button>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="green" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="green" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
      </Card>

      </div>
    
  );
}

export default PostCard;
