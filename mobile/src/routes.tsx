import React from 'react';
import {NavigationContainer, Route} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home'
import Detail from './pages/Detail';
import Recyclers from './pages/Recyclers'

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode='none'
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5',
                    }
                }}
            >
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Recyclers' component={Recyclers} />
                <AppStack.Screen name='Detail' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;