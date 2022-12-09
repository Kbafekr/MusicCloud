import React from "react";
import { useState, useEffect } from "react";
import wavesurfer from "wavesurfer.js";
import { useSelector } from "react-redux";
import { getAllDemoSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './index.css'
export function WaveSurferVisual() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songPlayer);
  const songs = useSelector((state) => state.song);
  const SongsArray = Object.values(songs);

  const {songId} = useParams()

  const filteredSong = SongsArray.filter((song) => song.id == songId)
  // console.log(filteredSong[0].url)
  useEffect(() => {
    //get all songs
    dispatch(getAllDemoSongs());
  }, [dispatch]);

  useEffect(() => {
    let WaveSurfer = wavesurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        fillParent: true,
        xhr: {
          cache: 'default',
          mode: 'cors',
          method: 'GET',
          credentials: 'same-origin',
          redirect: 'follow',
          referrer: 'client',
          headers: []
        }
    });

    WaveSurfer.load(filteredSong[0].url);
    // WaveSurfer.load("https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=lifelike-126735.mp3");
    WaveSurfer.setMute(true);
    WaveSurfer.setVolume(0);
  }, [filteredSong]);

  return (
    <>
      <section id="waveform"></section>
    </>
  );
}
