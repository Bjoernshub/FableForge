// CreateAStoryScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

function CreateAStoryScreen() {
    const [mainActor, setMainActor] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        const prompt = `Create a bedtime story for children with the main actor being a ${mainActor}.`;
        
        try {
            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: "gpt-3.5-turbo", // Adjust according required model
                prompt: prompt,
                max_tokens: 150,
            }, {
                headers: {
                    'Authorization': `Bearer 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`
                }
            });

            setStory(response.data.choices[0].text);
        } catch (error) {
            const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
            console.error('There was an error generating the story:', errorMessage);
            setStory(`Sorry, there was an error generating your story. Error: ${errorMessage}`);
        }        
    };

    return (
        <View style={styles.container}>
            {/* Buttons for selecting the main actor */}
            <Button title="Dragon" onPress={() => setMainActor('dragon')} />
            <Button title="Bear" onPress={() => setMainActor('bear')} />
            <Button title="Lion" onPress={() => setMainActor('lion')} />
            <Button title="Knight" onPress={() => setMainActor('knight')} />
            
            {/* Button to generate the story */}
            <Button title="Generate Story" onPress={generateStory} disabled={!mainActor} />

            {/* Display the generated story */}
            {story ? <Text style={styles.storyText}>{story}</Text> : null}
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
    storyText: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});

export default CreateAStoryScreen;
