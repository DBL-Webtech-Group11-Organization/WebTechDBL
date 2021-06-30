import sys

import pandas as pd
import numpy as np
import json
import csv

def makeJSONFile(data):
    JsonData = {}
    JsonData['data'] = []

    for i in range(len(data)):
        if not JsonData['data']:
            JsonData['data'].append({
                'From-ID': data[i][1],
                'To-ID': data[i][4],
                'From-Email': data[i][2],
                'To-Email': data[i][5],
                'From-Job': data[i][3],
                'To-Job': data[i][6],
                'Amount-Links': 0
            })
        else:
            foundlink = False
            for d in JsonData['data']:
                if d['From-ID'] == data[i][1] and d['To-ID'] == data[i][4]:
                    foundlink = True
                    d['Amount-Links'] += 1
                    break

            if not foundlink:
                JsonData['data'].append({
                    'From-ID': data[i][1],
                    'To-ID': data[i][4],
                    'From-Email': data[i][2],
                    'To-Email': data[i][5],
                    'From-Job': data[i][3],
                    'To-Job': data[i][6],
                    'Amount-Links': 0
                })
    with open('templates/JsonData.json', 'w') as outfile:
        json.dump(JsonData, outfile, indent=4)
    return JsonData


