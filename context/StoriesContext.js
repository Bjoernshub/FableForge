import React, { createContext, useState, useContext } from 'react';

const StoriesContext = createContext();

export const useStories = () => useContext(StoriesContext);

export const StoriesProvider = ({ children }) => {
    const [stories, setStories] = useState([]);

    const addStory = (newStory) => {
        setStories([...stories, newStory]);
    };

    return (
        <StoriesContext.Provider value={{ stories, addStory }}>
            {children}
        </StoriesContext.Provider>
    );
};
