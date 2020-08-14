import React, { Component } from 'react';
import axios from 'axios'
import { Spinner, Button } from 'react-bootstrap';
import Image from './image'

class ImageList extends Component {
    state = { 
        images:[],
        visible :2,
        isLoading: true,
        loaded: false,
     }

    componentDidMount(){

         setTimeout(this.getImages,1500)
     }
    getImages = () =>{
         axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
         }
        }).then(resp=>{
            console.log(resp);
            this.setState({images:resp.data})
        })
        this.setState({isLoading:false})
     }
     handleVisible =()=>{
        
         const visible = this.state.visible
         const new_visible = visible+2
         this.setState({loaded:true})
         setTimeout(()=>{
            this.setState({
                loaded:false,
                visible:new_visible})},300)
        
     }

    render() { 
        const images = this.state.images.slice(0, this.state.visible).map(img=>{
            return <Image key={img.id} pic={img.picture} name={img.classified}/>
        })
        return ( 
            <div>
               
                {this.state.isLoading ?
                <Spinner animation="border" role="status"></Spinner>
                :
                    <React.Fragment>
                        {this.state.images.length===0  ?
                            <p1>no images classified</p1>
                        :
                            <React.Fragment>
                                {images}
                                {this.state.loaded &&
                                <Spinner animation="border" role="status"></Spinner>}
                                <br/>
                                {this.state.images.length > this.state.visible ?
                                    <Button className="mb-4" variant='primary' size='lg' onClick={this.handleVisible}>Load more</Button>
                                :
                                    <h3 className="mb-4">no more images to load</h3>
                                }
                            </React.Fragment>
    }
                    </React.Fragment>
    }
            </div>
         );
    }
}
 
export default ImageList;