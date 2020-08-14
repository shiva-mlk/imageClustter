import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css';
import {Spinner, Button, Alert, Image} from 'react-bootstrap'
import axios from 'axios'

class Classifier extends Component {
    state = { 
        files : [],
        isLoading: false,
        Classification: null,
     }

     onDrop =(files)=>{
        this.setState({
            files: [],
            isLoading: true,
            Classification: null
            })
        this.loadImage(files)

     }
     loadImage=(files)=>{
        setTimeout(()=>{
            this.setState({
                files,
                isLoading: false
            },()=>{
                console.log(this.state.files[0].name)
            }
            )
        }, 1000)
     }
     
     sendImage =()=>{
         this.activateSpinner()
         let formData = new FormData()
         formData.append('picture', this.state.files[0], this.state.files[0].name)
         axios.post('http://127.0.0.1:8000/api/images/',formData,{
            headers:{
                'accept': 'application/json',
                'content-type':'multipart/form-data'
            }
            
         })
         .then(resp=>{
             this.takeImageClass(resp)
             console.log(resp.data.id)
             
         })
         .catch(err=>{
            console.log(err)
         })
        }

      activateSpinner = () =>{
        this.setState({
          files:[],
          isLoading:true
        })

      }
      deactivateSpinner =()=> {
        this.setState({
          isLoading:false,
          
        })

      }
      takeImageClass = (obj)=>{
        axios.get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`,{
          headers:{
            'accept': 'application/json',
          }
        })
        .then(resp=>{
          console.log(resp)
          this.setState({Classification : resp})
        })
        .catch(err=>{
          console.log(err)
       })
       this.deactivateSpinner()
      }
         
     

    render() { 
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        return ( 
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
            {({isDragActive, getRootProps, getInputProps}) => (
              <section className="container">
                <div {...getRootProps({className: 'dropzone back'})}>
                  <input {...getInputProps()} />
                  <i className="far fa-image mb-2 text-muted" style={{fontSize:100}}></i>
                  <p className="text-muted">{isDragActive ? " Drag some images" : "Drag 'n' drop some files here, or click to select files"}</p>
                </div>
                <aside>
                  
                  {files}
                </aside>
                {this.state.files.length >0 &&
                <Button variant='info' size='lg' onClick={this.sendImage} className='mt-3'>select image</Button> }
                {this.state.isLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
    }
                {this.state.Classification &&
                <React.Fragment>
                <Alert variant='primary'>{this.state.Classification.data.classified}</Alert>
                <Image className='justify-content-center' src={this.state.Classification.data.picture} height='200' rounded/>
                </React.Fragment>
    }
              </section>
            )}
          </Dropzone>
         );
    }
}
 
export default Classifier;