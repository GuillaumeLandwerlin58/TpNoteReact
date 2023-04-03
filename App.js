import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';

function HomeScreen() {
    const [distanceParcourue, setDistanceParcourue] = React.useState('');
    const [temperature, setTemperature] = React.useState('');
    const [pluie, setPluie] = React.useState('');
    const [denivele, setDenivele] = React.useState('');
    const [repas, setRepas] = React.useState('');
    const [aggreable, setAggreable] = React.useState('');

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text>Home</Text>
                <Text>Quelle est la distance parcourue</Text>
                <TextInput
                    type="text" onChange={text => setDistanceParcourue(text.value)}
                    placeholder="Distance parcourue"
                />
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Quel est la température </Text>
                <input
                    type="number" value={temperature} onChange={text => setTemperature(text)}
                    placeholder="Température"
                />
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Pluie</Text>
                <input type="checkbox" value={pluie} onChange={e => setPluie(e.target.value)}/>
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Dénivelé</Text>
                <input
                    value={denivele} onChange={e => setDenivele(e.target.value)}
                    placeholder="Dénivelé"
                />
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Repas</Text>
                <input
                    value={repas} onChange={e => setRepas(e.target.value)}
                    placeholder="Repas"
                />
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Aggréable</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={aggreable}
                    onValueChange={value => setAggreable(value)}
                />
            </View>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

