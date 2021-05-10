//const { model, Schema } = require( 'mongoose' );
const mongoose = require( 'mongoose' );
const mongooseAlgolia = require( 'mongoose-algolia' );

const { ALGOLIA_APP_ID, ALGOLIA_API_KEY } = require('../config/key');

const postSchema = new mongoose.Schema( {
  tag: String,
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
} );

postSchema.plugin( mongooseAlgolia, {
  appId: ALGOLIA_APP_ID,
  apiKey: ALGOLIA_API_KEY,
  indexName: 'QA-app', //The name of the index in Algolia, you can also pass in a function
  selector: '-user', //You can decide which field that are getting synced to Algolia (same as selector in mongoose)
  populate: {
    path: 'posts',
    select: 'user',
  },
  defaults: {
    user: 'unknown',
  },
  mappings: {
    body: function ( value )
    {
      return value;
    },
  },
 
  filter: function ( doc )
  {
    return !doc.softdelete
  },


  debug: true, // Default: false -> If true operations are logged out in your console
} );


let PostModel = mongoose.model( 'Post', postSchema );


PostModel.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
PostModel.SetAlgoliaSettings( {
  searchableAttributes: [ 'body', 'tag', 'id', 'user', 'comments' ], //Sets the settings for this schema
} );




//module.exports = model('Post', postSchema);
module.exports = PostModel;
