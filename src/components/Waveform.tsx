import React, { useEffect, useRef, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: '#eee',
  progressColor: '#2962FF',
  cursorColor: '#2962FF',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 350,
  normalize: true,
  partialRender: true,
});

interface WaveformProps {
  url: string;
  play: boolean;
  audioReady: () => void;
}

export default function Waveform(props: WaveformProps) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(props.url);
    wavesurfer.current.on('ready', function () {
      if (wavesurfer.current) {
        if (props.audioReady) {
          props.audioReady();
        }
        wavesurfer.current.setVolume(volume);
        wavesurfer.current.playPause();
      }
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  }, [props.play]);

  return (
    <div style={{ width: '100%' }}>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
