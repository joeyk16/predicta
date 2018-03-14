import { clarifaiKey, clarifaiModel } from '../config/secrets';
const Clarifai = require('clarifai');
const clarifaiClient = new Clarifai.App({
  apiKey: clarifaiKey,
});

export default class clarifaiApi {
  modelConcepts(cb) {
    return fetch('https://api.clarifai.com/v2/models/Taddar%20Vision/output_info', {
      method: "GET",
      headers: new Headers({
        'Authorization': `Key ${clarifaiKey}`,
        'Content-Type': 'application/json'
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        cb(res.model.output_info.data.concepts)
      })
  };

  trainNegative(imageUrl, modelConcept) {
    clarifaiClient.inputs.create({
      url: imageUrl,
      concepts: [
        {
          id: modelConcept,
          value: false
        }
      ]
    })
      .then((response, err) =>
      {
        console.log('res', response)
      }
    )
  }
}

