import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import { Grid, Header} from 'semantic-ui-react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';


const searchClient = algoliasearch(
  '2UZGCMHPPF',
  'c4264e347958a0b318db93771fe73c0f'
);

class Search extends Component {
  render() {
    return (
      <Grid.Row className="ais-InstantSearch">
        <Header><h2>Search Questions Here</h2></Header>
            <InstantSearch indexName="QA-app" searchClient={ searchClient }>
         <Grid columns={ 2 } stackable>
          <Grid.Column>
            <ClearRefinements />
            <h2>Topics</h2>
            <RefinementList attribute="tag" />
            <Configure hitsPerPage={8} />
          </Grid.Column>
          <Grid.Column>
            <SearchBox />
            <Hits hitComponent={Hit} />
             
         </Grid.Column>
        </Grid>
        </InstantSearch>
      </Grid.Row>
    );
  }
}

function Hit ( props )
{
    
    const id = props.hit.id;
    const href = "/posts/" + id
    
  return (
    
      
      <div className="hit-body">
          <a href={href}><Highlight attribute="body" hit={ props.hit } /></a>
          
      </div>
       
      
   
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Search;
