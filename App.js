/**
 * "Sequence" game
 * Andrew Kahn
 * January 2021
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';

const App: () => React$Node = () => {
  const Tile = (props) => {
    return (
      <Pressable
        onPress={() => {
          const res = props.match(props.number);

          if (!res.matches) {
            Alert.alert('Fail.', '', [
              {text: 'TRY AGAIN', onPress: () => props.restart()},
            ]);
          }
        }}
        style={{
          flex: 1,
        }}>
        {({pressed}) => (
          // <Text>id is {props.id}</Text>
          <View
            style={{
              flex: 1,
              backgroundColor: props.active || pressed ? 'white' : props.color,
            }}
          />
        )}
      </Pressable>
    );
  };

  const Tiles = (props) => {
    const getRandom = () => Math.floor(Math.random() * 4);
    //   // TODO change data structure [color] -> {color, key, active}
    //   const colors = ['tomato', 'goldenrod', 'seagreen', 'steelblue'];
    //   return colors.map((color) => {});
    // // todo make color nonstring so manipulations can be done - + for lighter etc

    const [tiles, setTiles] = useState([getRandom()]); //[0, 1, 2, 3]); // todo make generator so no need for pos? - but need pos for checking.. could be in gen too
    const [pos, setPos] = useState(0);
    const [matchPos, setMatchPos] = useState(0);
    const [activeTile, setActiveTile] = useState(-1);

    const match = (input) => {
      if (input === tiles[matchPos]) {
        let newMatchPos = matchPos;
        if (tiles.length > matchPos + 1) {
          newMatchPos = matchPos + 1;
        } else {
          setTiles(tiles.concat([getRandom()]));
          newMatchPos = 0;
          setPos(0);
        }

        setMatchPos(newMatchPos);
        return {
          matches: true,
          remain: tiles.length - newMatchPos,
          input,
        };
      } else {
        return {
          matches: false,
          reason: `input ${input} does not match in ${tiles.toString()} at pos ${matchPos.toString()}`,
        };
      }
    };

    useEffect(() => {
      function tick() {
        if (tiles.length > pos) {
          setActiveTile(tiles[pos]);
          setPos(pos + 1);
          setTimeout(() => {
            setActiveTile(-1);
          }, 500);
        } else {
          setActiveTile(-1);
        }
      }

      const timerID = setInterval(() => tick(), 600);

      return function cleanup() {
        clearInterval(timerID);
      };
    }, [pos, tiles]);

    const resume = () => {
      setPos(0);
    };

    const restart = () => {
      setTiles([getRandom()]);
      setPos(0);
      setMatchPos(0);
      setActiveTile(-1);
    };

    return (
      <>
        <Tile
          number={0}
          match={match}
          resume={resume}
          restart={restart}
          color={'tomato'}
          active={activeTile === 0}
        />
        <Tile
          number={1}
          match={match}
          resume={resume}
          restart={restart}
          color={'goldenrod'}
          active={activeTile === 1}
        />
        <Tile
          number={2}
          match={match}
          resume={resume}
          restart={restart}
          color={'seagreen'}
          active={activeTile === 2}
        />
        <Tile
          number={3}
          match={match}
          resume={resume}
          restart={restart}
          color={'steelblue'}
          active={activeTile === 3}
        />
        {/* <Text>active tile is {activeTile}</Text> */}
      </>
    );
  };

  // todo do playsequence one second after load
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Tiles />
      </SafeAreaView>
    </>
  );
};

// todo generate palette randomly - make number of tiles configurable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default App;
