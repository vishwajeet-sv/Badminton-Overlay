import React, { useEffect, useState, useRef, useMemo } from 'react';
import io from 'socket.io-client';
import * as qs from 'query-string';
import getGameState from './api/getGameState';
import getStream from './api/getStreamInfo';
import GameStateDataContext from './contexts/GameStateDataContext';
import StreamDataContext from './contexts/StreamDataContext';
import BottomScore from './Components/BottomScore/BottomScore';
import FullScreenBannerImage from './Components/FullScreenBanner/FullScreenBannerImage';
import FullScreenBannerAds from './Components/FullScreenBanner/FullScreenBannerAds';
import BlankScreen from './Components/BlankScreen/BlankScreen';
import EventDataContext from './contexts/EventDataContext';
import getEventInfo from './api/getEventInfo';
import './App.css';
import { SOCKET_BASE_URL } from './constants';
import {
  getCurrentSetSummaryVisible,
  getIsBlankVisible,
  getIsBottomScoreVisible,
  getIsMatchSummaryVisible,
  getIsVersusVisible,
  getPlayerSpecificInfoVisible,
} from './globalServices/BadmintonGameServices';
import CurrentSetSummary from './Components/CurrentSetSummary/CurrentSetSummary';
import MatchSummary from './Components/MatchSummary/MatchSummary';
import Versus from './Components/Versus/Versus';
import VOLImage from './Assets/VOL.png';
import SVImage from './Assets/SV.png';
import PDImage from './Assets/PD.png';
import styles from './styles.module.css';
import PlayerSpecificContribution from './Components/PlayerSpecificContribution/PlayerSpecificContribution';

function App() {
  const [gameStateData, setGameStateData] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const ref = useRef({ intervalId: null });
  const socketRef = useRef({ socket: null });

  const location = window.location.pathname;
  const id = location.substring(1);
  //const id = '612cefa39ba3d78c43a3f2e4';
  const windowUrl = window.location.search;
  const parsed = qs.parse(windowUrl);
  const { millisecondsDelay = 0 } = parsed;

  const getGameStateData = async () => {
    try {
      const data = await getGameState(id);
      console.log('getstate', data.data);
      setGameStateData(data.data.game_state);
    } catch (error) {
      console.log(`gamestate ${error}`);
    }
  };
  const getStreamData = async () => {
    try {
      const data = await getStream(id);
      console.log('teamsinfo', data.data);
      setStreamData(data.data.stream);
      if (data.data.stream.event_id !== '') {
        const eventInfo = await getEventInfo(data.data.stream.event_id);
        setEventData(eventInfo.data.event);
      }
    } catch (error) {
      console.log(`TeamInfo ${error}`);
    }
  };

  useEffect(() => {
    getGameStateData();
    getStreamData();
  }, []);

  const GameStateDataContextValue = useMemo(
    () => ({ gameStateData, setGameStateData }),
    [gameStateData, setGameStateData],
  );
  const TeamInfoDataContextValue = useMemo(
    () => ({ streamData, setStreamData }),
    [streamData, setStreamData],
  );
  const EventInfoDataContextValue = useMemo(
    () => ({ eventData, setEventData }),
    [eventData, setEventData],
  );
  const gData = {
    roomId: `GAME_STATE_${id}`,
  };
  const sData = {
    roomId: `STREAM_${id}`,
  };
  useEffect(() => {
    try {
      socketRef.current.socket = io.connect(SOCKET_BASE_URL);
      socketRef.current.socket.on('join-room', () => {
        socketRef.current.socket.emit('join-push-room', gData);
        socketRef.current.socket.emit('join-push-room', sData);
      });
      socketRef.current.socket.on('game-state-update', updatedData => {
        const { data } = updatedData;
        // eslint-disable-next-line camelcase
        const { game_state } = data;

        if (millisecondsDelay > 0) {
          setTimeout(() => {
            setGameStateData(game_state);
          }, millisecondsDelay);
        } else {
          setGameStateData(game_state);
        }
      });
      socketRef.current.socket.on('stream-update', updatedData => {
        const { data } = updatedData;
        const { stream } = data;

        setStreamData(stream);
      });
      return () => {
        if (socketRef.current.socket) {
          socketRef.current.socket.disconnect();
        }
      };
    } catch (error) {
      console.log(error);
    }
    return '';
  }, []);

  const isLevelOneInfoAvailable = () => {
    if (!gameStateData) return false;
    if (gameStateData.mode === 'LAYER_0') return true;
    if (gameStateData.mode === 'LAYER_1' && gameStateData.configure)
      return true;
    return false;
  };
  const isLevelZeroVisualFlagsVisible = () => {
    if (!gameStateData) return false;
    if (gameStateData.mode === 'LAYER_1') return true;
    if (gameStateData.mode === 'LAYER_0' && gameStateData.layer_zero_game_state)
      return true;

    return false;
  };

  return (
    gameStateData &&
    gameStateData.current_ads &&
    streamData &&
    isLevelOneInfoAvailable() &&
    isLevelZeroVisualFlagsVisible() && (
      <GameStateDataContext.Provider value={GameStateDataContextValue}>
        <StreamDataContext.Provider value={TeamInfoDataContextValue}>
          <EventDataContext.Provider value={EventInfoDataContextValue}>
            {' '}
            <div style={{ fontFamily: 'poppin-Medium' }}>
              <div
                className={
                  getIsVersusVisible(gameStateData)
                    ? 'animate__animated animate__fadeIn animate__faster'
                    : 'hide'
                }
              >
                <Versus />
              </div>

              <div
                className={
                  getIsBottomScoreVisible(gameStateData)
                    ? 'animate__animated animate__fadeIn animate__faster'
                    : 'hide'
                }
              >
                <BottomScore />
              </div>

              <div
                className={
                  getCurrentSetSummaryVisible(gameStateData)
                    ? 'animate__animated animate__fadeIn animate__faster'
                    : 'hide'
                }
              >
                <CurrentSetSummary />
              </div>

              <div
                className={
                  getPlayerSpecificInfoVisible(gameStateData)
                    ? 'animate__animated animate__fadeIn animate__faster'
                    : 'hide'
                }
              >
                <PlayerSpecificContribution />
              </div>

              <div
                className={
                  getIsMatchSummaryVisible(gameStateData)
                    ? 'animate__animated animate__fadeIn animate__faster'
                    : 'hide'
                }
              >
                <MatchSummary />
              </div>

              {getIsBlankVisible(gameStateData) && (
                <BlankScreen gameStateData={gameStateData} />
              )}
              {gameStateData.current_ads.banner_ad_size ===
                'banner_full_screen' &&
                gameStateData.current_ads.is_banner_ad_visible && (
                  <FullScreenBannerImage
                    imageUrl={gameStateData.current_ads.banner_ad_url}
                  />
                )}
              {true && (
                <>
                  {' '}
                  {streamData.event_id === 'EVENT_614c0dccfaab2944110df0f2' && (
                    <>
                      {' '}
                      <img className="pd" src={PDImage} alt="sv" />
                      <img className="vol" src={VOLImage} alt="sv" />
                      <img className="sv" src={SVImage} alt="sv" />
                    </>
                  )}
                </>
              )}
            </div>{' '}
            {streamData.channel_image &&
              (gameStateData.mode !== 'LAYER_0'
                ? gameStateData.visual_flags.is_channel_logo_visible
                : gameStateData.layer_zero_game_state.visual_flags
                    .is_channel_logo_visible) && (
                <img
                  className={styles.channelLogo}
                  src={`https://fhp-news-bucket.s3.amazonaws.com/${streamData.channel_image}`}
                  alt="logo"
                />
              )}
            {(gameStateData.mode !== 'LAYER_0'
              ? gameStateData.visual_flags.is_sv_logo_visible
              : gameStateData.layer_zero_game_state.visual_flags
                  .is_sv_logo_visible) && (
              <img className={styles.svLogo} src={SVImage} alt="logo" />
            )}
            {gameStateData.current_ads.is_video_ad_visible && (
              <FullScreenBannerAds
                videoUrl={gameStateData.current_ads.video_ad_url}
              />
            )}
          </EventDataContext.Provider>
        </StreamDataContext.Provider>
      </GameStateDataContext.Provider>
    )
  );
}

export default App;
