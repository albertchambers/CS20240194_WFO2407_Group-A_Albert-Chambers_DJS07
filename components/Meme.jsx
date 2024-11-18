// @ts-check

import React from "react";

/**
 * Meme Generator
 * @typedef {Object} Meme
 * @property {string} id - The unique identifier for the meme.
 * @property {string} name - The name of the meme.
 * @property {string} url - The URL of the meme image.
 * @property {number} width - The width of the meme image.
 * @property {number} height - The height of the meme image.
 * @property {number} box_count - The number of text boxes on the meme.
 */

/** @type {Meme[]} */
const initialMemes = [];

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    const [allMemes, setAllMemes] = React.useState(initialMemes);

    // Fetch memes and set a random image on load
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                const memes = data.data.memes;
                setAllMemes(memes);
                const randomNumber = Math.floor(Math.random() * memes.length);
                setMeme(prevMeme => ({
                    ...prevMeme,
                    randomImage: memes[randomNumber].url
                }));
            });
    }, []); // Dependency Array

    function getMemeImage() {
        if (allMemes.length === 0) return; // Safeguard in case the array is empty
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Random Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}
