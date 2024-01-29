import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {TextInput} from './components';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from './theme';
import {fetchLocations, fetchWeatherForecast} from './services/weather';
import {DAYS} from './constants';
import {weatherImages} from './config/Config';

const App = () => {
  
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);

  const [uiCity, setUICity] = useState('Deneme');
  const [uiCountry, setUICountry] = useState('Deneme');
  const [uiCelcius, setUlCelcius] = useState('23');
  const [uiStatusText, setUlStatusText] = useState('Overcast');
  const [uiWindSpeed, setUlSWindSpeed] = useState('22');
  const [uiDrop, setUlDrop] = useState('22');
  const [uiLocalTime, setUlLocalTime] = useState('6:05');
  const [uiWeatherImage, setUlWeatherImage] = useState('Partly cloudy');
  const [uiForecastDays, setUlForecastDays] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [city]);

  const search = () => {};

  const onPressListItem = (loc: any) => {
    const params = {
      cityName: loc.name,
      days: 7,
    };

    fetchWeatherForecast(params)
      .then(res => {
        setUICity(res.location.name);
        setUICountry(res.location.country);
        setUlCelcius(res.current.temp_c);
        setUlStatusText(res.current.condition.text);
        setUlSWindSpeed(res.current.wind_kph);
        setUlDrop(res.current.humidity);
        setUlLocalTime(res.location.localtime);
        setUlForecastDays(res.forecast.forecastday);
        setUlWeatherImage(res?.current?.condition?.text);
        setCity('');
      })
      .catch(err => console.log(err));
  };

  const handleSearch = () => {
    if (city.length > 2) {
      const params = {
        cityName: city,
      };
      fetchLocations(params)
        .then(res => {
          setLocations(res);
        })
        .catch(err => console.log(err));
    } else {
      setLocations([]);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('./assets/images/bg3.png')}>
        <TextInput
          isSearched={false}
          placeholder="Search city..."
          value={city}
          setValue={setCity}
          onPressSearch={search}
        />
        <ScrollView>
          {locations.length > 0 && (
            <View style={styles.locationsContainer}>
              {locations.map((loc: any, index) => {
                return (
                  <View
                    style={[
                      styles.locationOut,
                      {
                        borderBottomWidth:
                          index + 1 == locations.length ? 0 : 1,
                      },
                    ]}>
                    <Icon name="location-sharp" size={24} color={'black'} />
                    <TouchableOpacity onPress={() => onPressListItem(loc)}>
                      <Text style={styles.locationTitle}>
                        {loc?.name},{loc?.country}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
          <View style={[styles.header]}>
            <Text style={styles.headerCity}>
              {uiCity},<Text style={styles.headerCountry}>{uiCountry}</Text>
            </Text>
            <Image
              style={styles.forecastImage}
              source={weatherImages[uiWeatherImage]}
            />
            <View style={styles.bottom}>
              <Text style={styles.celcius}>{uiCelcius}&#176;</Text>
              <Text style={styles.celciusText}>{uiStatusText}</Text>
            </View>
            <View style={styles.bottomList}>
              <View style={styles.bottomItem}>
                <Image
                  style={styles.bottomImage}
                  source={require('./assets/icons/wind.png')}
                />
                <Text style={styles.bottomText}>{uiWindSpeed}km</Text>
              </View>

              <View style={styles.bottomItem}>
                <Image
                  style={styles.bottomImage}
                  source={require('./assets/icons/drop.png')}
                />
                <Text style={styles.bottomText}>{uiDrop}%</Text>
              </View>

              <View style={styles.bottomItem}>
                <Image
                  style={styles.bottomImage}
                  source={require('./assets/icons/sun.png')}
                />
                <Text style={styles.bottomText}>{uiLocalTime}</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.footerHeader}>
                <Icon name="calendar-outline" size={24} color={'white'} />
                <Text style={styles.footerTitle}>Daily Forecast</Text>
              </View>
              <FlatList
                data={uiForecastDays}
                style={styles.flatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={props => {
                  const item: any = props.item;
                  return (
                    <View
                      style={[
                        styles.fItemContainer,
                        {marginLeft: props.index == 0 ? 0 : 16},
                      ]}>
                      <Image
                        style={{width: 50, height: 50, alignSelf: 'center'}}
                        source={weatherImages[item?.day?.condition?.text]}
                      />
                      <Text style={styles.flItemText}>
                        {DAYS[props.index].title}
                      </Text>
                      <Text style={styles.flItemCelcius}>
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  locationsContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  locationOut: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  locationTitle: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    flex: 1,
  },
  headerCity: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 19,
    alignSelf: 'center',
  },
  headerCountry: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '300',
  },
  forecastImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 80,
  },
  bottom: {
    alignItems: 'center',
  },
  celcius: {
    fontSize: 56,
    marginTop: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  celciusText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '300',
    color: 'lightgray',
  },
  bottomList: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomImage: {
    width: 24,
    height: 24,
  },
  bottomText: {
    color: 'lightgray',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    marginTop: 20,
  },
  footerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerTitle: {
    color: 'lightgray',
    marginLeft: 12,
  },
  flatList: {
    marginTop: 10,
  },
  fItemContainer: {
    width: 100,
    height: 110,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: theme.bgWhite(0.35),
  },
  flItemText: {
    alignSelf: 'center',
    marginTop: 4,
    color: 'lightgray',
  },
  flItemCelcius: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 4,
    fontSize: 17,
  },
});
