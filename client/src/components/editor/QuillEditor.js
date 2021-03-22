import React from 'react';
import { Button } from 'semantic-ui-react';

import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import ImageCompress from 'quill-image-compress';

Quill.register('modules/imageCompress', ImageCompress);

class QuillEditor extends React.Component
{
 toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
     [ 'blockquote', 'code-block' ],
      [{ 'font': [] }],
   [{ 'header': 1 }, { 'header': 2 }],       

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
     [ { 'direction': 'rtl' } ],
    [{ 'size': ['small', false, 'large', 'huge'] }],                      // text direction
 
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

     [ { 'align': [] } ],
    ['link', 'image', 'video'],

     [ 'clean' ],
                                        // remove formatting button
];


    constructor(props) {
        super(props);

        this.state = {
            editorHtml:  "",
          
        };

    }

    handleChange = (html) => {
               
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    handleClear = () =>
    {
        this.setState( {
            editorHtml: ""
        }, () =>
        {
            this.props.onClear( this.state.editorHtml );
        } );
    }

   
    render() {
        return (

            <>
       
         <ReactQuill 
                   
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    value={this.state.editorHtml}
                    placeholder={ this.props.placeholder }
                    
                />

            <Button className="clear-button" color="pink" onClick={this.handleClear}>
            Clear
          </Button>      
       
        </>     

        
        )
    }

    modules = {
    syntax: true,
    toolbar: this.toolbarOptions,
    imageCompress: {
      quality: 0.8, // default
      maxWidth: 800, // default
      maxHeight: 800, // default
      imageType: 'image/jpeg', // default
      debug: true, // default
    }
        

    };

  
}

export default QuillEditor;