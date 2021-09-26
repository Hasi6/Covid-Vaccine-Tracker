import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
export default function privateRoute(ComposedComponent: any) {
  const Authentication: FC<any> = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      _checkAndRedirect();
    }, []);

    const _checkAndRedirect = async () => {};

    return (
      <View>
        {!loaded && (
          <View>
            <ActivityIndicator />
          </View>
        )}
        <ComposedComponent {...props} />
      </View>
    );
  };

  return Authentication;
}
