from sklearn.preprocessing import MinMaxScaler
import numpy as np
import zmq
import json
import tensorflow as tf

model_path = "server/pyserver/test_15M.h5"
model = tf.keras.models.load_model(model_path)

file_path = "server/pyserver/scaler_params.npy"
scaler = MinMaxScaler()
scaler.min_, scaler.scale_ = np.load(file_path)

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:8001")

def predict_price(close_prices):
    close_normalized = scaler.transform(np.array(close_prices).reshape(-1, 1))

    prediction_normalized = model.predict(np.array([close_normalized]).reshape(1, -1, 1))

    predicted_price = scaler.inverse_transform(prediction_normalized)[0][0]

    return predicted_price

while True:
    message = socket.recv()
    json_data = json.loads(message)

    close_prices = [
        json_data['closePrice1'],
        json_data['closePrice2'],
        json_data['closePrice3'],
        json_data['closePrice4'],
        json_data['closePrice5']
    ]

    predicted_price = predict_price(close_prices)
    print("Received request:", close_prices)

    socket.send_string(str(predicted_price))