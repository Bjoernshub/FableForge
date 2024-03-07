// CreateAStoryScreen.js
import React, { useState } from 'react';
import {
    View, Text, Button, StyleSheet, ScrollView,
    Modal, TouchableOpacity, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import config from '../config'; // make sure this path is correct

function CreateAStoryScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [choices, setChoices] = useState({
        type: '',
        genre: '',
        mainActor: ''
    });
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

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
        }
        // ... you can add more steps as needed
    ];

    const resetStoryCreation = () => {
        setStory('');
        setLoading(false);
        setCurrentStep(0);
        setChoices({
            type: '',
            genre: '',
            mainActor: ''
        });
    };

    const openModal = () => {
        resetStoryCreation();
        setIsModalVisible(true);
    };

    const selectOption = (option, choiceKey) => {
        setChoices({ ...choices, [choiceKey]: option });
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            generateStory();
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

    const generateStory = async () => {
        if (choices.type && choices.genre && choices.mainActor) {
            const prompt = `Create a ${choices.type} bedtime story for children with the main actor being a ${choices.mainActor} in a ${choices.genre} setting. Please add also smileys to have it visual beautiful for the child.`;
            console.log('API Key:', config.OPENAI_API_KEY);
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

                setStory(response.data.choices[0].message.content);
                closeModal();
            } catch (error) {
                const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
                console.error('There was an error generating the story:', errorMessage);
                setStory(`Sorry, there was an error generating your story. Error: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please complete all the steps.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openModal}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

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
                                <Button title="Generate Story" onPress={generateStory} />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </Modal>

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

