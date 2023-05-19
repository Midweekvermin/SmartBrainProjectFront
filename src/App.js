import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const setupClarify = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '30a7e085f91e49249b88d13c26db2ac9';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'midweekvermin';       
  const APP_ID = 'main';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';    
  const IMAGE_URL = imageUrl;

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
return requestOptions;
}




 
class App extends React.Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    fetch("https://api.clarifai.com/v2/models/" + "face-detection"+ "/outputs", setupClarify(this.state.input))
    .then(response => response.json())
    .then(response=>{
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
      }
     // this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

 render(){
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
    
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} />
      
    </div>
  );
 }
}

export default App;
