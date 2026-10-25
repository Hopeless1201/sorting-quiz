from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # This allows the frontend to send requests to the Flask backend

# Load pre-trained models and encoders
model = joblib.load("sorting_hat_model (4).pkl")
feature_encoders = joblib.load("feature_encoders (1).pkl")
target_encoder = joblib.load("target_encoder (1).pkl")

all_possible_answers = {
    'I am willing to take risks even when the outcome is uncertain (1- strongly disagree, 5- strongly agree)  ': [
    '1',
    '2',
    '3',
    '4',
    '5'],

    'If I had a free day to do anything, I would most likely:  ': [
        'Read or learn something new',
        'Try an adventurous activity',
        'Work on a personal goal or project',
        'Spend time with friends and help others'
    ],

    'I always put the needs of my friends and family before my own (1- strongly disagree, 5- strongly agree)  ':[     '1',
    '2',
    '3',
    '4',
    '5'
    ],

    'I would rather be feared than ignored  (1- strongly disagree, 5- strongly agree)  ':[     '1',
    '2',
    '3',
    '4',
    '5'
    ],

    'I enjoy being the leader in a group (1- strongly disagree, 5- strongly agree)  ':[     '1',
    '2',
    '3',
    '4',
    '5'
    ],

    "You’re working on a group project and someone isn't doing their part. What do you do?  ": [
        'Take on the extra work myself to ensure we succeed.',
        'Talk to them and encourage them to contribute',
        'Find a way to work around them and still get things done.',
        'Use creativity to make the task more engaging'
    ],

    "You're in a duel with a strong opponent. What do you do?  ": [
        'Charge in, trusting my skills',
        'Outsmart them and wait for the right moment.',
        'Try to resolve things peacefully.',
        'Use a clever trick to gain the upper hand.' 
    ],

    "During an argument, I rely on facts and logic rather than emotions (1- strongly disagree, 5- strongly agree)  ":[
'1',
'2',
'3',
'4',
'5'],

    "You’re offered a shortcut to achieve your dream job, but it involves breaking some rules. What do you do?  ":[
'Take it—success is what matters.',
'Stick to the rules and work hard.',
'Find a way to make it seem fair while still taking the shortcut.',
'Turn it down—I value honesty more than success.'],

   'I believe that patience and perseverance always lead to success (1- strongly disagree, 5- strongly agree)  ':[

'1',
'2',
'3',
'4',
'5'],

   'If my friend is being bullied, I would immediately stand up for them, no matter what (1- strongly disagree, 5- strongly agree)  ':[

'1',
'2',
'3',
'4',
'5'],


   'I adapt quickly to new situations and use them to my advantage (1- strongly disagree, 5- strongly agree)  ':[

'1',
'2',
'3',
'4',
'5'],

  'I enjoy solving puzzles and figuring out how things work (1- strongly disagree, 5- strongly agree)  ':[

'1',
'2',
'3',
'4',
'5'],



    'You find a wallet full of cash on the street. What do you do?': [
        'Turn it in to the authorities.',
        'Try to find the owner myself',
        'Keep it, but only if no one comes looking for it',
        'Investigate to see if there’s a deeper mystery'
    ],

    'What motivates you the most? ': [
        'Acheiving my dreams and being the best',
        'The thrill of adventure and challenge.',
        'Helping others and making a difference.',
        'Gaining knowledge and understanding the world.'
    ]
}

for key, values in all_possible_answers.items():
    if key in feature_encoders:
        encoder = feature_encoders[key]
        encoder.classes_ = np.array(sorted(set(list(encoder.classes_) + values)))
    else:
        encoder = LabelEncoder()
        encoder.fit(values)
        feature_encoders[key] = encoder


feature_keys = [
    'I am willing to take risks even when the outcome is uncertain (1- strongly disagree, 5- strongly agree)  ',
    'If I had a free day to do anything, I would most likely:  ',
    ' I always put the needs of my friends and family before my own (1- strongly disagree, 5- strongly agree)  ',
    'I would rather be feared than ignored  (1- strongly disagree, 5- strongly agree)  ',
    'I enjoy being the leader in a group (1- strongly disagree, 5- strongly agree)  ',
    "You’re working on a group project and someone isn't doing their part. What do you do?  ",
    "You're in a duel with a strong opponent. What do you do?  ",
    'During an argument, I rely on facts and logic rather than emotions (1- strongly disagree, 5- strongly agree)  ',
    'You’re offered a shortcut to achieve your dream job, but it involves breaking some rules. What do you do?  ',
    'I believe that patience and perseverance always lead to success (1- strongly disagree, 5- strongly agree)  ',
    'If my friend is being bullied, I would immediately stand up for them, no matter what (1- strongly disagree, 5- strongly agree)  ',
    'I adapt quickly to new situations and use them to my advantage (1- strongly disagree, 5- strongly agree)  ',
    'I enjoy solving puzzles and figuring out how things work (1- strongly disagree, 5- strongly agree)  ',
    'You find a wallet full of cash on the street. What do you do?',
    'What motivates you the most? '
]

def process_value(value, encoder):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        print(f"⚠️ Value '{value}' not in encoder. Using fallback '{encoder.classes_[0]}'")
        return encoder.transform([encoder.classes_[0]])[0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("📩 Incoming JSON:", data)

    input_data = data.get("answers", [])

    if len(input_data) != len(feature_keys):
        return jsonify({
            "error": "Mismatched number of answers",
            "expected": len(feature_keys),
            "received": len(input_data)
        }), 400

    processed_data = []
    for i, key in enumerate(feature_keys):
        value = input_data[i]
        try:
            print(f"🔍 Processing '{key}' -> '{value}'")

            if key in feature_encoders:
                encoder = feature_encoders[key]
                encoded = process_value(value, encoder)
                processed_data.append(encoded)
            else:
                processed_data.append(float(value))
        except Exception as e:
            return jsonify({
                "error": f"❌ Failed to process input at position {i} (key '{key}'): '{value}'",
                "details": str(e)
            }), 400

    input_array = np.array(processed_data).reshape(1, -1)

    try:
        prediction = model.predict(input_array)
        predicted_house = target_encoder.inverse_transform(prediction)[0]
    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500

    return jsonify({"house": predicted_house})

if __name__ == "__main__":
    print("🔥 Flask is launching...")
    app.run(debug=True)



#@app.route("/predict", methods=["POST"])
#def predict():


    # Debugging: Print a log whenever this endpoint is accessed
    #print(">>> /predict endpoint was hit!")
    #print("Request method:", request.method)  # Print the HTTP method used
    #data = request.get_json()
    
    #answers = data.get("answers")  # Extract answers array from JSON
    #print("🔎 Number of answers received:", len(answers))
    #print("🧠 Number of features in encoder:", len(feature_encoders))
    #print("🧠 Encoder keys:", list(feature_encoders.keys()))

    #if not answers or len(answers) != 15:
     #   return jsonify({"error": "Invalid number of answers"}), 400  # Handle invalid input
    
    # Process the answers using encoders and make prediction
    #input_df = pd.DataFrame([answers], columns=list(feature_encoders.keys()))
    
    #for col, encoder in feature_encoders.items():
     #   input_df[col] = encoder.transform(input_df[col].astype(str))
    
    #prediction = model.predict(input_df)
    #house = target_encoder.inverse_transform(prediction)[0]  # Decode the result

    #return jsonify({"house": house})  # Send the result back as a JSON

#if __name__ == "__main__":
 #   print("🔥 Flask is launching...")
  #  app.run(debug=True)
