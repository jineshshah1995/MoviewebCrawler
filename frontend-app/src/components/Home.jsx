import React, { Component, Fragment } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import _ from "lodash";
import { DataGrid } from "@material-ui/data-grid";

export default class home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      noDataFound: false,
      movieDetails: [],
      movieName: "",
      movieYear: "",
      movieCertificate: "",
      movieGenre: "",
      movieImdb: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getHeaderColumns = () => {
    return [
      { id: "id", field: "movieName", headerName: "Name", width: 250 },
      { id: "id", field: "movieYear", headerName: "Year", width: 150 },
      { id: "id", field: "movieDuration", headerName: "Duration", width: 150 },
      {
        id: "id",
        field: "movieCertificate",
        headerName: "Certificate",
        width: 100,
      },
      { id: "id", field: "movieGenre", headerName: "Genre", width: 250 },
      { id: "id", field: "movieImdb", headerName: "IMDB Rating", width: 150 },
    ];
  };
  onClearClick = () => {
    this.setState({
      isLoading: false,
      noDataFound: false,
      movieDetails: [],
      movieName: "",
      movieYear: "",
      movieCertificate: "",
      movieGenre: "",
      movieImdb: "",
    });
  };
  onClick = () => {
    const queryStrings = this.getQueryString();
    this.setState(
      {
        isLoading: true,
        noDataFound: false,
      },
      () => {
        axios
          .get("http://localhost:4000/getMovieDetails", {
            params: queryStrings,
          })
          .then((apiResponseData) => {
            if (apiResponseData.data.length === 0)
              this.setState({ noDataFound: true });
            _.forEach(
              apiResponseData.data,
              (element, index) => (element["id"] = index)
            );
            this.setState(
              {
                movieDetails: apiResponseData.data,
              },
              () => {
                this.setState({
                  isLoading: false,
                });
              }
            );
          });
      }
    );
  };

  getQueryString = () => {
    let x = {};
    if (!_.isEmpty(this.state.movieName)) x["movieName"] = this.state.movieName;
    if (!_.isEmpty(this.state.movieYear)) x["movieYear"] = this.state.movieYear;
    if (!_.isEmpty(this.state.movieGenre))
      x["movieGenre"] = this.state.movieGenre;

    return x;
  };
  render() {
    let component = null;
    if (this.state.isLoading) {
      component = (
        <Loader
         type="Rings"
         color="#00BFFF"
         height={100}
         width={100}
 />
      );
    } else if (!this.state.isLoading && !_.isEmpty(this.state.movieDetails)) {
      component = (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={this.state.movieDetails}
            columns={this.getHeaderColumns()}
            pageSize={10}
          />
        </div>
      );
    } else if (this.state.noDataFound) {
      component = <h1>No Data Found !!! </h1>;
    }
    return (
      <Fragment>
        {
          <form className="center">
            <h1>Movie Details</h1>
            <br />
            <label className="elementPading">Movie Name:</label>
            <input 
              name="movieName"
              value={this.state.movieName}
              type="text"
              onChange={this.onChange}
            />
            <label className="elementPading">Year:</label>
            <input 
              name="movieYear"
              value={this.state.movieYear}
              type="number"
              onChange={this.onChange}
            />
            <label className="elementPading">Genre:</label>
            <input 
              name="movieGenre"
              value={this.state.movieGenre}
              type="text"
              onChange={this.onChange}
            />
            <br />
            <button 
              type="button"
              className="btn btn-primary elementPading"
              onClick={this.onClick}
            >
              Search
            </button>
            <button 
              type="button" 
              className="btn btn-primary elementPading"
              onClick={this.onClearClick}
            >
              Clear
            </button>
          </form>
        }
        <br />
        {component}
      </Fragment>
    );
  }
}
