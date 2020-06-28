import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {View, ImageBackground, StyleSheet, Image, Text} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Axios from 'axios';
interface IBGEUfResponse {
  sigla: string,
}

interface IBGECityResponse {
  nome: string,
}
interface City {
  label: string,
  value: string,
  key: string,
}

interface Uf {
  label: string,
  value: string,
  key: string,
}

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const handlePressEntrar = () => {
    navigation.navigate('Recyclers', {city: selectedCity, uf: selectedUf});
  }

  useEffect(() => {
    Axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
        const ufInicials = response.data.map(uf => ({label: uf.sigla, value: uf.sigla, key: uf.sigla}))
        setUfs(ufInicials)
    });
}, [])
    
  useEffect(() => {
      if (selectedUf === '0') {
        return;
      }
      
      Axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
          const cityNames = response.data.map(city => ({label: city.nome, value: city.nome, key: city.nome}));
          setCities(cityNames);
      });
  }, [selectedUf])


  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{width: 274, height: 368}}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
        <View style={styles.pickers}>
        <RNPickerSelect
          onValueChange={(text) => setSelectedUf(text)}
          items={ufs}
          placeholder={{
            label: 'Selecione a UF',
            value: null,
          }}
        />
        <RNPickerSelect
          onValueChange={(text) => setSelectedCity(text)}
          items={cities}
          placeholder={{
            label: 'Selecione a cidade',
            value: null,
          }}
        />
        </View>
      </View>
      <View>
        <RectButton style={styles.button} onPress={handlePressEntrar}>
          <View style={styles.buttonIcon}>
            <Icon name='arrow-right' color='#FFF' size={20}/>
          </View>
          <Text style={styles.buttonText}> 
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },


  pickers: {
    marginTop: 40,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },


  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;