import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
} from 'react-native';

export default function LinkTab({
  tabIcon,
  tabText,
  navigateIcon,
  onPress
}) {

  const propsCustom = {
    tabIcon: tabIcon === undefined || tabIcon === '' 
      ? <FontAwesome name="circle" size={50} color="#999999" /> 
      : tabIcon,
    tabText: tabText === undefined || tabText === '' 
      ? 'Go To Screen' 
      : tabText,
    navigateIcon: navigateIcon === undefined || navigateIcon === '' 
      ? null 
      : navigateIcon,
    onPress
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabIconAndText}>
          {propsCustom.tabIcon}
          <Text style={styles.tabText}>{propsCustom.tabText}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Text>{propsCustom.navigateIcon}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  tabIconAndText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333333',
  },
});
