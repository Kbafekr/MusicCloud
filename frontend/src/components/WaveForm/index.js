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
  console.log(filteredSong[0].url)
  useEffect(() => {
    //get all songs
    dispatch(getAllDemoSongs());
  }, [dispatch]);

  useEffect(() => {
    let WaveSurfer = wavesurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        fillParent: true
    });

    WaveSurfer.load(filteredSong[0]?.url);
    WaveSurfer.setMute(true);
    WaveSurfer.setVolume(0);
  }, [filteredSong]);

  return (
    <>
      <section id="waveform"></section>
    </>
  );
}
