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

  trainModel(url, modelConcept, value) {
    // TODO Refractor. Had to do a fetch. SDK didn't work.
    const params = {
      "inputs": [
        {
          "data": {
            "image": {
              "url": url
            },
            "concepts":[
              {
                "id": modelConcept,
                "value": value
              }
            ]
          }
        }
      ]
    }

    return fetch('https://api.clarifai.com/v2/inputs', {
      method: "POST",
      headers: new Headers({
        'Authorization': `Key ${clarifaiKey}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res
      })
  };
}

