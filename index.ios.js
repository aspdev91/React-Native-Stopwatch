import formatTime from 'minutes-seconds-milliseconds';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View, 
  ScrollView
} from 'react-native';


var StopWatch = React.createClass({
  // Sets the initial state, runs once when component is inititated
  getInitialState: function(){
    return {
      timeElapsed: 0,
      laps: [],
      running: false,
      startTime: null
    }
  },
 
  render: function(){
    return <View style={styles.container}>
      <View style={[styles.header]}> 
        <View style={[styles.timeWrapper]}>
          <Text style={styles.timer}>
          {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer]}>
        {this.showLaps()}
      </View>
    </View>
  },

  startStopButton: function(){
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
    onPress={ this.handleStartPress }
    underlayColor="gray"
    style={[styles.button,style]}
    >
    <Text>
      {this.state.running ? 'Stop' : 'Start'}
    </Text>
    </TouchableHighlight>
  },

  handleStartPress: function(){
    // clearInterval is a javascript function
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }
    
    this.setState({startTime: new Date()});
      // Update our new state some new value
      // 30 represents millisecond
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    },30);
  },

  showLaps: function(){
    return this.state.laps.map((time,index) => {
      return <View style={styles.lap}>

      <Text style={styles.lapText}>
      {formatTime(time)}
      </Text>
      </View>
    })
  },

  lapButton: function(){
    return <TouchableHighlight
    onPress={this.handleLapPress}
    underlayColor="gray"
    style={styles.button}
    >
      <Text>
      Lap
      </Text>
    </TouchableHighlight>
  },

  handleLapPress: function(){
      this.setState({
        laps: [...this.state.laps, this.state.timeElapsed]
      });
      this.setState({startTime: new Date()});
  },

  border: function(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'stretch'
  },
  
  header: { 
    flex: 1
  },

  footer: { 
    flex: 1
  },

  timeWrapper: { 
    flex: 5, 
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  buttonWrapper: { 
    flex: 3, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  timer: {
    fontSize: 60
  },

  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  startButton: {
    borderColor: '#00CC00'
  },

  stopButton: {
    borderColor: '#CC0000'
  },

  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  lapText: {
    fontSize: 30
  },

  contentContainer: { 
    paddingVertical: 20 
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);