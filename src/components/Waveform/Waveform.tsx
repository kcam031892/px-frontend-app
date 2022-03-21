import React, { useEffect, useRef } from 'react';
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
type Props = {
  url: string;
  play: boolean;
  audioReady: () => void;
};

const Waveform: React.FC<Props> = ({ url, play, audioReady }) => {
  const waveformRef = useRef<null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current) {
        audioReady();
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.playPause();
      }
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  }, [play]);

  return (
    <div style={{ width: '100%' }}>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
};

export default Waveform;
