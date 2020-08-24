import React, { Component } from 'react'; //import React Component
import './style.css';
import lodash from 'lodash';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pets: this.props.pets
    }
  }

  adopt = (string) => {
    this.setState((state) => {
      let pet = lodash.find(state.pets, ['name', string]);
      pet.adopted = true;
      return pet;
    })
  }

  render() {
    return (
      <div>
      <header className="jumbotron jumbotron-fluid py-4">
      <div className="container">
        <h1>{"Adopt a Pet"}</h1>
      </div>
    </header>
  
    <main className="container">
      <div className="row">
        <div id="navs" className="col-3">
          <BreedNav breeds={Object.keys(lodash.groupBy(this.state.pets, 'breed'))}></BreedNav>
          <AboutNav></AboutNav>
        </div> 
  
        <div id="petList" className="col-9">
          <PetList pets={this.state.pets} adoptCallback={this.adopt}></PetList>
        </div> 
      </div>
    </main>
  
    <footer className="container">
      <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
    </footer>  
    </div>  
    );
  }
}

class AboutNav extends Component {
  render() {
    return (
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a href="#/">How to Adopt</a></li>
          <li><a href="#/">Volunteering</a></li>
          <li><a href="#/">Events</a></li>
          <li><a href="#/">Donate</a></li>
          <li><a href="#/">About Us</a></li>
        </ul>
      </nav>
    );
  }
}

class BreedNav extends Component {
  render() {
    return (
        <nav id="breedLinks">
          <h2>Pick a Breed</h2>
          <ul className="list-unstyled">
          {this.props.breeds.map((breed) => {
             return <li key={breed}><a href="#/">{breed}</a></li>
          })}
          </ul>
        </nav>
    )
  }
}

class PetCard extends Component {
  onClick = () => {
    this.props.adoptCallback(this.props.name)
  }

  render() {
    return (
      <div className="card" onClick={this.onClick}>
        <img className="card-img-top" src={this.props.image} alt={this.props.name} />
        <div className="card-body">
          <h3 className="card-title">{this.props.adopted ? this.props.name + ' (Adopted)' : this.props.name}</h3>
          <p className="card-text">{this.props.sex + ' ' + this.props.breed}</p>
        </div>
      </div>
    );

  }
}

class PetList extends Component {
  render() {
    return (
      <div>
      <h2>Dogs for Adoption</h2>
      <div className="card-deck">
        {this.props.pets.map(thing => {
          return (<PetCard pets={thing} adoptCallback={this.props.adoptCallback}/>)
        })}
      </div>
      </div>
    )
  }
}

export default App;
