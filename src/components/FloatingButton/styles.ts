import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    right: 10,
  },
  otherFeedContainer: {
    position: 'absolute',
    bottom: '12%',
    right: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#5C2DD3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});
