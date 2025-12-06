"""Synthetic data generator for vehicle/plastics/heating logs
TODO: generate realistic synthetic logs to train/test models
"""
import random
import json

def gen_sample(n=100):
    samples = []
    for i in range(n):
        samples.append({
            'userId': None,
            'type': random.choice(['vehicle','plastics','heating','trees']),
            'data': {}
        })
    return samples

if __name__ == '__main__':
    print(json.dumps(gen_sample(10), indent=2))
