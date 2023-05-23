import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';





 
class App extends React.Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
    }
  }
   Clarify = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '30a7e085f91e49249b88d13c26db2ac9';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'midweekvermin';       
    const APP_ID = 'test';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    
    const IMAGE_URL = imageUrl;
  
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  
    
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    // Sometimes the Clarifai server is down and responds with an error 400
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID  + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.displayFaceBox(this.calculateFaceLocation(result))
        })
       
        .catch(error => console.log('error', error));
  
  
  }
   
  
  
   calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
     const height = Number(image.height);
     console.log(width,height);
     console.log(clarifaiFace);
     return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
     }
   };
  
   displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box)
   }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
 this.Clarify(this.state.input);
  }

  onRouteChange = (route) =>{
    this.setState({route: route})
  }

 render(){
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
     
      { this.state.route === 'signin' 
     ? <SignIn onRouteChange={this.onRouteChange} />
    :
      <div>
         <Navigation onRouteChange={this.onRouteChange} />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl = {this.state.input} />
      
     </div>
 }
    </div> 
  );
 }
}



export default App;
