import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Modal,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import kelownaEvents from '../kelownaJsons/kelownaEventsSoi.json';

type KelownaEvent = {
    id: string;
    titleKelowna: string;
    descriptionKelowna: string;
    categoryKelowna: string;
    dateKelowna: string;
    locationKelowna: string;
};

const eventListKelowna: KelownaEvent[] = [
    { id: '1', titleKelowna: 'Wine Tasting', descriptionKelowna: 'Explore local wineries.', categoryKelowna: 'Food & Drink', dateKelowna: '2023-11-15', locationKelowna: 'Downtown Kelowna' },
    { id: '2', titleKelowna: 'Art Festival', descriptionKelowna: 'Experience local art.', categoryKelowna: 'Arts & Culture', dateKelowna: '2023-11-20', locationKelowna: 'Kelowna Art Gallery' },
    { id: '3', titleKelowna: 'Hiking Adventure', descriptionKelowna: 'Join a guided hike.', categoryKelowna: 'Outdoor', dateKelowna: '2023-11-25', locationKelowna: 'Knox Mountain' },
    { id: '4', titleKelowna: 'Music Concert', descriptionKelowna: 'Live music by local bands.', categoryKelowna: 'Music', dateKelowna: '2023-12-01', locationKelowna: 'Kelowna Community Theatre' },
    { id: '5', titleKelowna: 'Farmers Market', descriptionKelowna: 'Fresh produce and crafts.', categoryKelowna: 'Shopping', dateKelowna: '2023-12-05', locationKelowna: 'Kelowna Farmers Market' },
];

const AdditionalCodeBase: React.FC = () => {
    const [filteredEventsKelowna, setFilteredEventsKelowna] = useState<KelownaEvent[]>(eventListKelowna);
    const [selectedCategoryKelowna, setSelectedCategoryKelowna] = useState<string | null>(null);
    const [savedEventsKelowna, setSavedEventsKelowna] = useState<string[]>([]);
    const [isModalKelownaVisible, setIsModalKelownaVisible] = useState(false);
    const [searchQueryKelowna, setSearchQueryKelowna] = useState('');

    useEffect(() => {
        const loadSavedEventsKelowna = async () => {
            const saved = await AsyncStorage.getItem('kelowna_saved_events');
            if (saved) {
                setSavedEventsKelowna(JSON.parse(saved));
            }
        };
        loadSavedEventsKelowna();
    }, []);

    const handleFilterKelowna = (category: string | null) => {
        setSelectedCategoryKelowna(category);
        if (category) {
            setFilteredEventsKelowna(eventListKelowna.filter(event => event.categoryKelowna === category));
        } else {
            setFilteredEventsKelowna(eventListKelowna);
        }
    };

    const handleSaveEventKelowna = async (eventId: string) => {
        const updatedSavedEventsKelowna = savedEventsKelowna.includes(eventId)
            ? savedEventsKelowna.filter(id => id !== eventId)
            : [...savedEventsKelowna, eventId];
        setSavedEventsKelowna(updatedSavedEventsKelowna);
        await AsyncStorage.setItem('kelowna_saved_events', JSON.stringify(updatedSavedEventsKelowna));
    };

    const handleSearchKelowna = (query: string) => {
        setSearchQueryKelowna(query);
        if (query.trim() === '') {
            setFilteredEventsKelowna(eventListKelowna);
        } else {
            setFilteredEventsKelowna(
                eventListKelowna.filter(event =>
                    event.titleKelowna.toLowerCase().includes(query.toLowerCase()) ||
                    event.descriptionKelowna.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    return (
        <SafeAreaView style={stylesKelowna.containerKelowna}>
            {kelownaEvents.map((kelownaEvent) => (
                <Text style={stylesKelowna.headerKelowna}>{kelownaEvent.titleKelowna}</Text>
            ))}

            <View style={stylesKelowna.filterContainerKelowna}>
                <TouchableOpacity
                    style={[stylesKelowna.filterButtonKelowna, !selectedCategoryKelowna && stylesKelowna.activeFilterKelowna]}
                    onPress={() => handleFilterKelowna(null)}
                >
                    <Text style={stylesKelowna.filterTextKelowna}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesKelowna.filterButtonKelowna, selectedCategoryKelowna === 'Food & Drink' && stylesKelowna.activeFilterKelowna]}
                    onPress={() => handleFilterKelowna('Food & Drink')}
                >
                    <Text style={stylesKelowna.filterTextKelowna}>Food & Drink</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesKelowna.filterButtonKelowna, selectedCategoryKelowna === 'Arts & Culture' && stylesKelowna.activeFilterKelowna]}
                    onPress={() => handleFilterKelowna('Arts & Culture')}
                >
                    <Text style={stylesKelowna.filterTextKelowna}>Arts & Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesKelowna.filterButtonKelowna, selectedCategoryKelowna === 'Outdoor' && stylesKelowna.activeFilterKelowna]}
                    onPress={() => handleFilterKelowna('Outdoor')}
                >
                    <Text style={stylesKelowna.filterTextKelowna}>Outdoor</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={stylesKelowna.searchInputKelowna}
                placeholder="Search events..."
                value={searchQueryKelowna}
                onChangeText={handleSearchKelowna}
            />

            <FlatList
                data={filteredEventsKelowna}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={stylesKelowna.eventCardKelowna}>
                        <Text style={stylesKelowna.eventDetailsKelowna}>Location: {item.locationKelowna}</Text>
                        <Text style={stylesKelowna.eventDetailsKelowna}>Date: {item.dateKelowna}</Text>
                        <Text style={stylesKelowna.eventDescriptionKelowna}>{item.descriptionKelowna}</Text>
                        <Text style={stylesKelowna.eventTitleKelowna}>{item.titleKelowna}</Text>
                        <TouchableOpacity
                            style={stylesKelowna.saveButtonKelowna}
                            onPress={() => handleSaveEventKelowna(item.id)}
                        >
                            <Text style={stylesKelowna.saveButtonTextKelowna}>
                                {savedEventsKelowna.includes(item.id) ? 'Unsave' : 'Save'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity style={stylesKelowna.modalButtonKelowna} onPress={() => setIsModalKelownaVisible(true)}>
                <Text style={stylesKelowna.modalButtonTextKelowna}>View Saved Events</Text>
            </TouchableOpacity>

            <Modal visible={isModalKelownaVisible} animationType="slide" transparent={true}>
                <View style={stylesKelowna.modalContainerKelowna}>
                    <Text style={stylesKelowna.modalHeaderKelowna}>Saved Events</Text>
                    <FlatList
                        data={eventListKelowna.filter(event => savedEventsKelowna.includes(event.id))}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={stylesKelowna.eventCardKelowna}>
                                <Text style={stylesKelowna.eventTitleKelowna}>{item.titleKelowna}</Text>
                                <Text style={stylesKelowna.eventDescriptionKelowna}>{item.descriptionKelowna}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={stylesKelowna.closeButtonKelowna} onPress={() => setIsModalKelownaVisible(false)}>
                        <Text style={stylesKelowna.closeButtonTextKelowna}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const stylesKelowna = StyleSheet.create({
    saveButtonTextKelowna: { color: '#fff', textAlign: 'center' },
    containerKelowna: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    filterContainerKelowna: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    filterButtonKelowna: { padding: 8, borderRadius: 8, backgroundColor: '#ddd' },
    activeFilterKelowna: { backgroundColor: '#0A0262' },
    filterTextKelowna: { color: '#fff', fontWeight: 'bold' },
    searchInputKelowna: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16 },
    eventCardKelowna: { padding: 16, marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
    closeButtonTextKelowna: { color: '#fff', fontWeight: 'bold' },
    eventDescriptionKelowna: { fontSize: 14, marginBottom: 8 },
    eventDetailsKelowna: { fontSize: 12, color: '#555' },
    saveButtonKelowna: { marginTop: 8, padding: 8, backgroundColor: '#0A0262', borderRadius: 8 },
    eventTitleKelowna: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    modalContainerKelowna: { flex: 1, backgroundColor: '#fff', padding: 16 },
    modalButtonKelowna: { padding: 12, backgroundColor: '#0A0262', borderRadius: 8, alignSelf: 'center' },
    modalButtonTextKelowna: { color: '#fff', fontWeight: 'bold' },
    headerKelowna: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    modalHeaderKelowna: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    closeButtonKelowna: { padding: 12, backgroundColor: '#0A0262', borderRadius: 8, alignSelf: 'center', marginTop: 16 },
});

export default AdditionalCodeBase;
