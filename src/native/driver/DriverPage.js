// @flow
/* global navigator */
import type { Location } from '../../common/types';
import React from 'react';
import { Box, Button, Text } from '../../common/components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { sendCurrentLocation } from '../../common/driver/actions';

type DriverPageProps = {
  sendCurrentLocation: typeof sendCurrentLocation,
};

class DriverPage extends React.Component {
  state = {
    initialPosition: undefined,
    lastPosition: undefined,
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        this.setState({ initialPosition });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = position; // JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onSendLocationPress = () => {
    const { sendCurrentLocation }: DriverPageProps = this.props;
    sendCurrentLocation({
      latitude: this.state.lastPosition.coords.latitude,
      longitude: this.state.lastPosition.coords.longitude,
    });
  };

  render() {
    return (
      <ScrollView>
        <Box alignItems="center" paddingVertical={1}>
          <Text align="center">
            Initial Position: {JSON.stringify(this.state.initialPosition)}
          </Text>
          <Text align="center">
            Current Postion: { JSON.stringify(this.state.lastPosition) }
          </Text>
        </Box>
        <Button
          primary
          onPress={this.onSendLocationPress}
        >
          Send Position
        </Button>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { sendCurrentLocation },
)(DriverPage);
