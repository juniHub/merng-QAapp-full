import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import ShowMore from "@vinspee/react-show-more";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery( FETCH_POSTS_QUERY );



  return (
  <>
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column style={ { marginBottom: 20 } }>
            <PostForm />
          </Grid.Column>
            
          ) }
        </Grid.Row>

        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
           
            <Transition.Group >
                <Grid.Row>
            {posts &&
                <ShowMore items={ posts }  > 
               
             
                { ( { current, onMore } ) => (
                  <div>
                   
                    {current.map( ( post ) => (
      
                      <Grid.Column key={ post.id }>
              
                        <PostCard post={ post } />
              
                      </Grid.Column>
           
                    ) ) }

                    <Button className="load-more" color="pink"
                    disabled={!onMore}
                    onClick={() => {
                    if (!!onMore) onMore();
                    }}
                  >
                  Load More
                    </Button>

                  </div>
                  


                  
               )}   
              </ShowMore>
                }

           </Grid.Row>     
       
          </Transition.Group>
            
        )}
    
    </Grid>
     
</>
  );
}

export default Home;
