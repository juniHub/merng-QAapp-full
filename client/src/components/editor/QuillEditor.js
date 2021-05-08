import React from 'react';
import { Button , Icon} from 'semantic-ui-react';

import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import ImageCompress from 'quill-image-compress';

Quill.register('modules/imageCompress', ImageCompress);

class QuillEditor extends React.Component
{
 toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike', 'link'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['video', 'formula', 'image'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
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

    <Button className="clear-button" animated color='black' onClick={this.handleClear}>
      <Button.Content visible>Clear</Button.Content>
      <Button.Content hidden>
        <Icon name='eraser' />
      </Button.Content>
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