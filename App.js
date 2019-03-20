
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchWeather } from './Weather';
const iconNames={
  Clear:'md-sunny',
  Rain:'md-rainy',
  Thunderstorm:'md-thunderstorm',
  Clouds:'md-cloudy',
  Snow:'md-snow',
  Drizzle:'md-umbrella',
}

const phrases={
  Clear:{
  title:"It's Freaking Amazing",
  subtitle:"Rock That Shit",
  color:"#E32500",
  backgroundColor:"#FFD107"
  },
  Rain:{
    title:"Rain Rain Go Away",
    subtitle:"Come Again Another Day",
    color:"#004A96",
    backgroundColor:"#2F343A"
    },
  Thunderstorm:{
    title:"Goddamnit! It's a Thunderstorm!!",
    subtitle:"Stay Inside",
    color:"#FBFF46",
    backgroundColor:"#020202"
    },
  Clouds:{
    title:"Cloudy As It Can Ever Be",
    subtitle:"Chill Out Bud",
    color:"#0044FF",
    backgroundColor:"#939393"
    },
  Snow:{
    title:"Snowy Snowy",
    subtitle:"Snowman Alert",
    color:"#021D4C",
    backgroundColor:"#15A678"
    },
  Drizzle:{
    title:"It's Just Droplets,Suck It Up",
    subtitle:"Brooooooo",
    color:"#B3F6E4",
    backgroundColor:"#1FBB68"
    },
}

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {temp:0,
    weather:'Clear'}
  }
  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => fetchWeather(position.coords.latitude,position.coords.longitude).then(res=>this.setState({temp:Math.round(res.temp),weather:res.weather})),
      (err) => console.log(err),
      { timeout: 8000 }
    );
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor:phrases[this.state.weather].backgroundColor}]}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={75} color={'white'} />
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
          <Text style={[styles.title,{color:phrases[this.state.weather].color}]}>{phrases[this.state.weather].title}</Text>
          <Text style={[styles.subtitle,,{color:phrases[this.state.weather].color}]}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  temp: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 45,
    color: 'white'
  },
  body: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    margin: 10,
  },
  title: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 78,
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    color: 'white'
  }
});
