import React from 'react'


        class MovieRow extends React.Component{

            viewMovie(){
                console.log(this.props.movie.title)
                const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
                window.location.href = url
            }
            render() {
                return (
                    <div>
                        <table>
                            <tbody>
                                <tr  key={this.props.movie.id}>
                                    <td width="150">
                                        <img alt="poster" src={this.props.movie.poster_src} />    
                                    </td>
                                    <td width="12"/>
                                    <td>
                                        <h3>{this.props.movie.title}</h3>  
                                        <p>{this.props.movie.overview}</p>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-info"  
                                            onClick={this.viewMovie.bind(this)}
                                        >
                                            View
                                        </button>                                                   
                                    </td>
                                </tr>
                            </tbody>    
                        </table><br/>
                    </div>
                )
                    
            }
        }

        export default MovieRow;