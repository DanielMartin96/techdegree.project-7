import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import Form from "./components/Form";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";

// api key
import apiKey from "./config";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      catPics: [],
      dogPics: [],
      computerPics: [],
      inputPics: [],
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch("cat");
    this.performSearch("dog");
    this.performSearch("computer");
  }

  performSearch = (query) => {
    const api = apiKey;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (query === "cat") {
          this.setState({
            catPics: response.data.photos.photo,
          });
        } else if (query === "dog") {
          this.setState({
            dogPics: response.data.photos.photo,
          });
        } else if (query === "computer") {
          this.setState({
            computerPics: response.data.photos.photo,
          });
        } else {
          this.setState({
            inputPics: response.data.photos.photo,
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Form performSearch={this.performSearch} />
          <Nav />

          <Route
            path={`/cats`}
            render={() => <PhotoContainer pics={this.state.catPics} />}
          />
          <Route
            path={`/dogs`}
            render={() => <PhotoContainer pics={this.state.dogPics} />}
          />
          <Route
            path={`/computers`}
            render={() => <PhotoContainer pics={this.state.computerPics} />}
          />

          <Route
            path={"search/:query"}
            render={() => <PhotoContainer pics={this.state.inputPics} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}
