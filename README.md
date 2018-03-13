# Predicta

Use Predicta to train your [Clarifai](https://www.clarifai.com/) models to become more accurate.

Just set up your `config.js` then upload your image to view the image concepts and their percentages.

If the highest percentage image is incorrect, you can add it to the negatives of any concept in your model. Thus training your model to become more accurate.

## Install

 1. `npm install`
 2. `cp ./src/config.js.example ./src/config.js`
 3. Add your credintials to `config.js`
 4. `npm start`

## Future development

 1. Save an image to a negative on a Clarifai model.
 2. Have multiple Clarifai models to train. At the moment you can just have 1.
 3. Environment variables.
 4. Styling
 5. Flash messages
 6. Delete image
