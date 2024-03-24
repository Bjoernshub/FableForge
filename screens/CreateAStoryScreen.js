// CreateAStoryScreen.js
import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet, ScrollView,
    Modal, TouchableOpacity, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import config from '../config'; // make sure this path is correct
import { useStories } from '../context/StoriesContext';

function CreateAStoryScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [choices, setChoices] = useState({
        type: '',
        genre: '',
        mainActor: '',
        bedtimeOrAction: ''
    });
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');


    useEffect(() => {
        openModal(); // Automatically open the modal when the screen is loaded
    }, []);

    useEffect(() => {
        console.log('Choices state updated:', choices);
    }, [choices]);


    const steps = [
        {
            question: "What kind of story?",
            options: ["creative", "classic", "science"],
            choiceKey: "type"
        },
        {
            question: "What is the genre/theme?",
            options: ["Fantasy", "Realistic", "Future"],
            choiceKey: "genre"
        },
        {
            question: "Who is the main actor?",
            options: ["Dragon", "Bear", "Lion", "Knight"],
            choiceKey: "mainActor"
        },
        {
            question: "Bedtime or action story?",
            options: ["Bedtime", "Action"],
            choiceKey: "bedtimeOrAction"
        }
        // ... more steps will come. 
    ];

    const resetStoryCreation = () => {
        setStory('');
        setLoading(false);
        setCurrentStep(0);
        setChoices({
            type: '',
            genre: '',
            mainActor: '',
            bedtimeOrAction: '',
        });
    };

    const openModal = () => {
        resetStoryCreation();
        setIsModalVisible(true);
    };

    const selectOption = (option, choiceKey) => {
        console.log('Selected option:', option, 'for choiceKey:', choiceKey);
        setChoices(prevChoices => ({ ...prevChoices, [choiceKey]: option }));
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const allChoicesMade = Object.values(choices).every(choice => choice !== '');


    const { addStory } = useStories();

    const generateStory = async () => {
        console.log(choices);
        const { type, genre, mainActor, bedtimeOrAction } = choices;
        if (!allChoicesMade) {
            alert('Please complete all the steps.');
            return;
        }

        const prompt = `Create a ${choices.type} ${choices.bedtimeOrAction} story for children with the main actor being a ${choices.mainActor} in a ${choices.genre} setting. Please add also smileys to have it visual beautiful for the child.
        Please start the Story with a title.`;
        console.debug('API Key:', config.OPENAI_API_KEY);
        console.log('Create a ${choices.type} ${bedtimeOrAction} story for children with the main actor being a ${choices.mainActor} in a ${choices.genre} setting.')
        setLoading(true);

            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }],
                }, {
                    headers: {
                        'Authorization': `Bearer ${config.OPENAI_API_KEY}`
                    }
                });

                // Assume the title ends with the first newline character
                const storyResponse = response.data.choices[0].message.content;
                const titleEndIndex = storyResponse.indexOf('\n');
                const storyTitle = storyResponse.substring(0, titleEndIndex).trim();
                const storyWithoutTitle = storyResponse.substring(titleEndIndex + 1).trim();

                //setStory(response.data.choices[0].message.content);
                setTitle(storyTitle);
                setStory(storyWithoutTitle);

                addStory({ title: storyTitle, content: storyWithoutTitle });

                closeModal();
            } catch (error) {
                const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
                console.error('There was an error generating the story:', errorMessage);
                setStory(`Sorry, there was an error generating your story. Error: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
    };


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalView}>
                    <ScrollView>
                        <Text style={styles.modalText}>{steps[currentStep].question}</Text>
                        {steps[currentStep].options.map((option, index) => (
                            <Button
                                key={index}
                                title={option}
                                onPress={() => selectOption(option, steps[currentStep].choiceKey)}
                            />
                        ))}
                        <View style={styles.modalButtonContainer}>
                            {currentStep > 0 && (
                                <Button title="Previous" onPress={previousStep} />
                            )}
                            {currentStep === steps.length - 1 && (
                                <TouchableOpacity
                                    onPress={generateStory}
                                    disabled={!allChoicesMade}
                                    style={{
                                        backgroundColor: allChoicesMade ? '#0000ff' : '#aaa', // Color changes based on allChoicesMade
                                        padding: 10,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: allChoicesMade ? 1 : 0.5, // Make button look disabled if not all choices are made
                                    }}>
                                    <Text style={{ color: '#fff' }}>Generate Story</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            {/* Display the title as a header if it exists */}
            {title && <Text style={styles.titleText}>{title}</Text>}

            {/* Use ScrollView to make the story scrollable */}
            <ScrollView style={styles.storyContainer}>
                {/* Display the generated story */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    story ? <Text style={styles.storyText}>{story}</Text> : null
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    addButtonText: {
        fontSize: 24,
        color: 'blue',
        // ... additional styles for the add button
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
        // ... additional styles for modal text
    },
    storyContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    storyText: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
});

export default CreateAStoryScreen;

