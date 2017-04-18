// @flow
import type { Location } from '../../common/types';
import React from 'react';
import { Box, Button, Text } from '../../common/components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/driver/actions';

type DriverPageProps = {
  setCurrentLocale: typeof setCurrentLocale,
};

class DriverPage extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { setCurrentLocale }: DriverPageProps = this.props;

    return (
      <ScrollView>
        <Box alignItems="center" paddingVertical={1}>
          <Text align="center">
            Initial Position: {this.state.initialPosition}
          </Text>
          <Text align="center">
            Current Postion: {this.state.initialPosition}
          </Text>
        </Box>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { setCurrentLocale },
)(DriverPage);
