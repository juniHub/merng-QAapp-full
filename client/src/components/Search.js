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
  process.env.REACT_APP_ALGOLIA_API,
  process.env.REACT_APP_ALGOLIA_KEY
);

class Search extends Component {
  render() {
    return (
      <Grid.Row className="ais-InstantSearch">
 
        <Header><h2>Search Questions Here</h2></Header>
        <div style={ {marginBottom: "2rem"} } class="ais-PoweredBy ais-PoweredBy--light">
        <a href="https://www.algolia.com/" target="_blank" class="ais-PoweredBy-link" aria-label="Search by Algolia" rel="noopener noreferrer">
          <img alt="algolia logo" src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1620810155/Algolia_com_Website_assets/images/shared/algolia_logo/search-by-algolia-light-background.svg"/>
        </a>
        </div>

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
