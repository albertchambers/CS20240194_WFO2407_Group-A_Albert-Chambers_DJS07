import React from "react"
import memeData from "../src/memeData.json"

let url

export default function Meme() {
    function getMemeImage() {
        const memesArray = memeData.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        url = memesArray[randomNumber].url
        console.log(url)
    }
    return (
        <main>
            <p>{url}</p>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
        </main>
    )
}