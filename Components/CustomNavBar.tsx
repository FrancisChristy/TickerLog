import { View, Platform, StyleSheet, Image } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  House,
  NotebookPen,
  CirclePlus,
  ChartArea,
  UserRoundArrowLeft,
} from 'lucide-react-native';

const PRIMARY_COLOR = '#a3e6cd';
const SECONDARY_COLOR = '#eeeae8';
const TEXT_COLOR = '#10b981';

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, { backgroundColor: isFocused ? '#fdf9f9' : 'transparent' }]}
          >
            {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECONDARY_COLOR)}
            {isFocused && <Text style={styles.text}>{label as string}</Text>}
          </PlatformPressable>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case 'Home':
        return (
          <Image
            source={require('../Images/home-1.png')}
            style={styles.iconSize}
          />
        );
      case 'Journal':
        return (
          <Image
            source={require('../Images/notebook-check.png')}
            style={styles.iconSize}
          />
        );
      case 'Add':
        return (
          <Image
            source={require('../Images/add.png')}
            style={styles.iconSize}
          />
        );
      case 'Analytics':
        return (
          <Image
            source={require('../Images/analytics.png')}
            style={styles.iconSize}
          />
        );
      // case 'Profile':
      //     return <UserRoundArrowLeft color="#ffff" />;
      default:
        return (
          <Image
            source={require('../Images/user.png')}
            style={styles.iconSize}
          />
        );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: '80%',
    alignSelf: 'center',
    bottom: 40,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  text: {
    color: TEXT_COLOR,
    marginLeft: 8,
    fontWeight: '500',
  },
  iconSize: {
    width: 30,
    height: 30,
  }
});

export default CustomNavBar;
