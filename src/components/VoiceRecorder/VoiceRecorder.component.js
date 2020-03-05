import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClearIcon from '@material-ui/icons/Clear';
import LinearProgress from '@material-ui/core/LinearProgress';

import IconButton from '../UI/IconButton';
import './VoiceRecorder.css';

class VoiceRecorder extends Component {
  static propTypes = {
    /**
     * Audio source
     */
    src: PropTypes.string,
    /**
     * Callback, fired when audio recording changes
     */
    onChange: PropTypes.func.isRequired,
    /**
     * User info
     */
    user: PropTypes.object
  };

  state = {
    isRecording: false,
    isPlaying: false
  };

  startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new window.MediaRecorder(stream);
        this.mediaRecorder.start();
        this.setState({ isRecording: true });
      })
      .catch(function(err) {});
  };

  stopRecording = () => {
    this.mediaRecorder.stop();

    this.mediaRecorder.ondataavailable = event => {
      this.chunks = event.data;
      this.setState({ isRecording: false });
    };

    this.mediaRecorder.onstop = () => {
      const { onChange } = this.props;
      let audio;

      const reader = new window.FileReader();
      reader.readAsDataURL(this.chunks);
      const mediaReader = new window.FileReader();
      mediaReader.readAsArrayBuffer(this.chunks);

      reader.onloadend = async () => {
        audio = reader.result;
        if (onChange) {
          onChange(audio);
        }
      };
      this.chunks = '';
    };
  };

  playAudio = src => {
    const audio = new Audio();
    audio.src = src;
    audio.addEventListener('ended', () => {
      this.setState({ isPlaying: false });
    });
    audio.play();
  };

  handleRecordClick = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  handlePlayClick = () => {
    const { src } = this.props;
    this.setState({ isPlaying: true });
    this.playAudio(src);
  };

  handleClear = () => {
    const { onChange } = this.props;
    onChange('');
  };

  render() {
    const { src } = this.props;
    const recordStyle = {
      color: this.state.isRecording ? 'red' : 'grey'
    };
    const playStyle = {
      color: this.state.isPlaying ? 'green' : 'grey'
    };

    return (
      <div className="VoiceRecorder">
        <IconButton onClick={this.handleRecordClick} label="Record">
          <MicIcon fontSize="large" style={recordStyle} />
        </IconButton>
        {this.state.isRecording && (
          <div className="VoiceRecorder__progress">
            <LinearProgress color="secondary" />
          </div>
        )}
        {src && !this.state.isRecording && (
          <>
            <IconButton onClick={this.handlePlayClick} label="Play recording">
              <PlayArrowIcon fontSize="large" style={playStyle} />
            </IconButton>
            <IconButton onClick={this.handleClear} label="Clear recording">
              <ClearIcon fontSize="large" style={{ color: 'grey' }} />
            </IconButton>
          </>
        )}
      </div>
    );
  }
}

export default VoiceRecorder;
