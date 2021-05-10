import React, { useContext} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Button, Header } from 'semantic-ui-react';


import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import Search from '../components/Search';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import ShowMore from "@vinspee/react-show-more";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery( FETCH_POSTS_QUERY );



  return (
    <div className="ui container">
      
        <Search />
  
 
      
      <Grid.Row>
         <Grid columns={1}>
        {user && (
          <div style={ { marginBottom: 20, width: "100%" } }>
              <PostForm />
              
          </div>
          ) }
          </Grid>
        </Grid.Row>

        { loading ? (
        <Grid.Row className="page-loading">
           <Grid columns={1}>
            <h1>Loading posts..</h1>
          </Grid>
        </Grid.Row>
        ) : (
           
          <Transition.Group >
            
          <Header as='h1' className="page-title">Latest QAs</Header>
          
            {posts &&
              <ShowMore items={ posts } by={3}> 
               
             
              { ( { current, onMore } ) => (
                
                
                <Grid.Row>
                <Grid columns={ 1 } stackable>
                   
                    {current.map( ( post ) => (
                     
      
                        <Grid.Column key={ post.id }>
              
                        <PostCard post={ post } />
              
                        </Grid.Column>
                     
           
                    ) ) }

                    <Button className="load-more" style={{backgroundColor: "#393e46", color:"white"}}
                    disabled={!onMore}
                    onClick={() => {
                    if (!!onMore) onMore();
                    }}
                      >
                      Load More
                    </Button>

                    </Grid>
                    </Grid.Row>


                  
              ) }
              

                </ShowMore>
                }

           
       
          </Transition.Group>
            
          ) }
    
      </div>

  );
}

export default Home;