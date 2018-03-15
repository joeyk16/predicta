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

  trainNegative(url, modelConcept, cb) {
    // TODO Refractor this
    return fetch('https://api.clarifai.com/v2/inputs', {
      method: "POST",
      headers: new Headers({
        'Authorization': `Key ${clarifaiKey}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "inputs": [
          {
            "data": {
              "image": {
                "url": url
              },
              "concepts":[
                {
                  "id": modelConcept,
                  "value": false
                }
              ]
            }
          }
        ]
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        {
          if (res.status.description === "Failure") {
            cb(res.inputs[0].status.description, 'error')
          } else {
            cb('Negative image successfully sent', 'succcess')
          }
        }
      })
  };
}

