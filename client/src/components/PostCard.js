import React, { useContext } from 'react';
import { Button, Card, Icon, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

//import Avatar from 'react-avatar';

import parse from 'html-react-parser';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
} )
{
  const { user } = useContext( AuthContext );
  const seed = getRandomInt( 100 );
 
  return (
    <div className="content-post">
     <Card fluid>
      
      <Card.Content className="card-content">
         
          <img className="avatar" src={ `https://avatars.dicebear.com/api/human/${ seed }.svg?background=%23222831` } alt="avatar"></img>
        <Card.Header>{username}</Card.Header>
        <Card.Meta >
          {moment(createdAt).fromNow(true)}
          </Card.Meta>
        
        <Card.Description>
            <div className="home-post-page">
            { parse( body ) }
            </div>
        </Card.Description>
         
      <Button className="show-button" animated color='green' as={Link} to={`/posts/${id}`}>
      <Button.Content visible>Show More</Button.Content>
      <Button.Content hidden>
        <Icon name='eye' />
      </Button.Content>
    </Button>
      </Card.Content>
      <Card.Content extra className="extra">
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="green">
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
