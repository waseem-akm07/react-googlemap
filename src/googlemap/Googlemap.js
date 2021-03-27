import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';


var AnyReactComponent = ({ text }) => <div>{text}</div>;


class Googlemap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Latitude: '',
            Longitude: '',
            LocationName: '',
            list: []
        }
    }


    static defaultProps = {
        center: {
            lat: 30.7333,
            lng: 76.7794
        },
        zoom: 11
    };

    loadLoaction = () => {
        axios.get('http://localhost:64823/api/google/getallloctions')
            .then(res => {
                // if (isForLoad) {
                    this.setState({ list: res.data })
               // }
                // this.setState({ list: res.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeLocation = (e) => {
        this.setState({ LocationName: e.target.value })
    }

    componentDidMount() {
        this.fetchCoordinates();
    }

    fetchCoordinates = () => {
        axios.get('http://localhost:64823/api/google/getallloctions')
            .then(res => {
                this.setState({ list: res.data })

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    googleMapHandle = (item) => {
        this.setState({ Latitude: item.lat, Longitude: item.lng })
    }

    onSaveLocation = () => {

        if (this.state.Latitude.length !== 0 && this.state.Longitude.length !== 0 && this.state.LocationName.length !== 0) {
            var cordinates = { Latitude: this.state.Latitude, Longitude: this.state.Longitude, LocationName: this.state.LocationName }
            console.log(cordinates)
            axios.post('http://localhost:64823/api/google/postlocation',
                cordinates
            ).then(res => {
                console.log(res)
                this.loadLoaction();
            })
                .catch(function (error) {
                    console.log(error);
                })
            this.setState({ Latitude: '', Longitude: '', LocationName: '' })
        }
        else
            alert("Required fields is Empty")
    }

    render() {
        return (
            <div>
                <h2>Google Map</h2>

                <div style={{ height: '100vh', width: '100%' }}>

                    <GoogleMapReact
                        onClick={this.googleMapHandle}
                        bootstrapURLKeys='AIzaSyB73_PPdxMCN-hN7ZVWziNtwyjctKPiil0'
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}

                    >
                        {this.state.list.map((item) =>
                            <AnyReactComponent
                                lat={item.Latitude}
                                lng={item.Longitude}
                                text={'📍' + item.LoactionName}
                            >
                            </AnyReactComponent>
                        )}

                    </GoogleMapReact>
                </div>

                <br />
                <label> Your Co-Ordinates</label><br />

                <label>Latitude : </label>
                <input type="text" readOnly value={this.state.Latitude} placeholder="Latitude" />
                <span> </span>

                <label>Longitude : </label>
                <input type="text" readOnly value={this.state.Longitude} placeholder="Longitude" />
                <span> </span>

                <label>Location Name : </label>
                <input type="text" value={this.state.LocationName} onChange={this.onChangeLocation} placeholder="Loaction Name" />

                <br /><br />

                <input type="submit" value="Save" onClick={this.onSaveLocation} style={{ "width": "20%" }} className="btn btn-success" />
                <h3> Click here to Save your Location</h3>
                <br />
            </div>
        );
    }
};
export default Googlemap;


