import React from 'react';
import { Button, Form, Segment, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

//import { useForm } from '../util/postHook';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

//import QuillEditor from './editor/QuillEditor';


function PostForm ()
{
  
  const { values, onChange, onSubmit} = useForm(createPostCallback, {
    body: "", tag: ""
 
  } );

 


  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
      values.tag = "";
    
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Segment className="quill-editor fluid ui raised very padded">
      
        <Form>
        <Form.Field>
          
          <div className="field">
            <label className="label">Topic:</label>
                      <input
                        type="text"
                        placeholder="Input Your Topic Here"
                        name="tag"
                        value={values.tag}
                        onChange={ onChange }
                        error={ error ? true : false }
                    
                      
                      />                  
          </div>

                   
  
          <div className="field">
          <label className="label">Question:</label>
                  <textarea
                        type="text"
                        placeholder="Input Your Question Here"
                        name="body"
                        value={values.body}
                        onChange={ onChange }
                        error={ error ? true : false }
            
            
                  />
          </div>
         
        
      <Button disabled={values.body.trim() === '' || values.tag.trim() === '' } className="submit-button" animated color='pink' onClick={onSubmit}>
      <Button.Content visible>Submit</Button.Content>
      <Button.Content hidden>
        <Icon name='paper plane' />
      </Button.Content>
    </Button>

                   
        </Form.Field>
      </Form>



      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      ) }
      
    </Segment>
  );

  
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $tag: String!) {
    createPost(body: $body, tag:$tag) {
      id
      body
      tag
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
