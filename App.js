import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Slider from '@react-native-community/slider';
import {RadioButton} from 'react-native-paper';
import {useEffect} from "react";

function HomeScreen({addActivity}) {
    const [distanceParcourue, setDistanceParcourue] = React.useState('');
    const [temperature, setTemperature] = React.useState('');
    const [pluie, setPluie] = React.useState(false);
    const [denivele, setDenivele] = React.useState('');
    const [repas, setRepas] = React.useState('');
    const [aggreable, setAggreable] = React.useState('');

    const [information, setInformation] = React.useState([]);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text>Home</Text>
                <Text>Quelle est la distance parcourue</Text>
                <TextInput
                    type="number" onChange={e => setDistanceParcourue(parseInt(e.target.value))}
                />
            </View>

            <View>
                <Text>Quel est la température </Text>
                <TextInput
                    type="number" onChange={e => setTemperature(parseInt(e.target.value))}
                />
            </View>

            <View>
                <Text>Pluie</Text>
                <RadioButton
                    value="first"
                    status={pluie ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setPluie(!pluie);
                    }}/>
            </View>

            <View>
                <Text>Dénivelé</Text>
                <TextInput
                    type="number" value={denivele} onChange={e => setDenivele(parseInt(e.target.value))}
                />
            </View>

            <View>
                <Text>Repas</Text>
                <TextInput
                    type="text" value={repas} onChange={e => setRepas(e.target.value)}
                />
            </View>

            <View>
                <Text>Aggréable</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#FFFFFF"
                    value={aggreable}
                    onValueChange={value => setAggreable(value)}
                />
            </View>

            <Button
                title="Ajouter"
                onPress={() => {
                    addActivity({
                        distanceParcourue: distanceParcourue,
                        temperature: temperature,
                        pluie: pluie,
                        denivele: denivele,
                        repas: repas,
                        aggreable: aggreable

                    });
                    {
                        console.log(information)
                    }
                }
                }
            />
        </View>
    );
}

function InformationScreen({state}) {
    const [statistique, setStatistique] = React.useState({
        distanceMoy: state.activities.reduce((acc, activity) => acc + activity.distanceParcourue, 0) / state.activities.length,
        temperatureMoy: state.activities.reduce((acc, activity) => acc + activity.temperature, 0) / state.activities.length,
        deniveleMoy: state.activities.reduce((acc, activity) => acc + activity.denivele, 0) / state.activities.length,
        aggreableMoy: state.activities.reduce((acc, activity) => acc + activity.aggreable, 0) / state.activities.length,
    });

    useEffect(() => {
        setStatistique({
            distanceMoy: state.activities.reduce((acc, activity) => acc + activity.distanceParcourue, 0) / state.activities.length,
            temperatureMoy: state.activities.reduce((acc, activity) => acc + activity.temperature, 0) / state.activities.length,
            deniveleMoy: state.activities.reduce((acc, activity) => acc + activity.denivele, 0) / state.activities.length,
            aggreableMoy: state.activities.reduce((acc, activity) => acc + activity.aggreable, 0) / state.activities.length,
        })
    }, [state.activities]);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Global</Text>
            <Text>Distance moyenne : {statistique.distanceMoy}</Text>
            <Text>Température moyenne : {statistique.temperatureMoy}</Text>
            <Text>Dénivelé moyen : {statistique.deniveleMoy}</Text>
            <Text>Aggréable moyen : {statistique.aggreableMoy}</Text>
        </View>
    );
}

function ProfilScreen() {
    const [poids, setPoids] = React.useState('');
    const [taille, setTaille] = React.useState('');
    const [genre, setGenre] = React.useState('');

    const [profil, setProfil] = React.useState([]);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text>Profil</Text>
                <Text>Quel est votre poids</Text>
                <TextInput
                    type="text" value={poids} onChange={e => setPoids(e.target.value)}
                />
            </View>

            <View>
                <Text>Quel est votre taille</Text>
                <TextInput
                    type="text" value={taille} onChange={e => setTaille(e.target.value)}
                />
            </View>

            <View>
                <Text>Quel est votre genre</Text>
                <TextInput
                    type="text" value={genre} onChange={e => setGenre(e.target.value)}
                />
            </View>

            <Button
                title="Ajouter"
                onPress={() => {
                    setProfil([...profil, {
                        poids: poids,
                        taille: taille,
                        genre: genre
                    }])
                    {
                    }
                }
                }
            />

        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    const [state, setState] = React.useState({
        activities: [],
        profile: {
            poids: 0,
            taille: 0,
            genre: '',
        }
    });

    function addActivity(activity) {
        setState({
            ...state,
            activities: [...state.activities, activity]
        })
    }

    function addProfile(profile) {
        setState({
            profile: profile
        })
    }


    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home">
                    {() => <HomeScreen addActivity={addActivity}/>}
                </Tab.Screen>
                <Tab.Screen name="Global">
                    {() => <InformationScreen state={state}/>}
                </Tab.Screen>
                <Tab.Screen name="Profil">
                    {() => <ProfilScreen addProfile={addProfile}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

