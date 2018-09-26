import React, { Component } from 'react';
import MovieRow from '../components/SearchMovie/MovieRow';
import $ from 'jquery';

class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch('คู่กรรม'); // constructor ค่าตั้งต้น ให้ค้าหนังที่ชื่อว่า คู่กรรม
    this.searchOnchange = this.searchOnchange.bind(this);
  }
  performSearch(searchData) {
    // สร้างตัวแปล API Resful
    const url =
      'https://api.themoviedb.org/3/search/movie?&api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=' +
      searchData;
    $.ajax({
      url: url,
      success: searchResults => {
        // สร้าง parameter ชื่อ searchResults = ตัวแปรข้อมูลทั้งหมดของ url API
        const results = searchResults.results; //results คือข้อมูล searchResults.results
        // console.log(results[0])
        var movieRows = [];
        //นำ results มา forEach ตัวแปลเป็น movie แล้ว console.log(movie.title)
        results.forEach(movie => {
          movie.poster_src =
            'https://image.tmdb.org/t/p/w185' + movie.poster_path;
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows });
      },
      errer: (xhr, status, err) => {
        console.error('Fail Error');
      }
    });
  }

  searchOnchange(e) {
    const searchData = e.target.value;
    this.performSearch(searchData);
  }

  render() {
    return (
      <div>
        <div className="Movie_Header">
          <table className="titlebar">
            <tbody>
              <tr>
                <td width="10%" />
                <td>Movie DB Search</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />

        <input
          onChange={this.searchOnchange}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <br />
        <label htmlFor="">
          https://www.themoviedb.org/search/movie?query=Aquaman&language=th-TH
        </label>

        <div className="MovieConten">{this.state.rows}</div>
      </div>
    );
  }
}

export default SearchMovie;
