import sys

import pandas as pd
import numpy as np
import json
import csv

def makeJSONFile(data):

    JsonData = {}
    JsonData['data'] = []


    for i in range(len(data)):
            JsonData['data'].append({
                'From-ID': data[i][1],
                'To-ID': data[i][4],
                'From-Email': data[i][2],
                 'To-Email': data[i][5],
                'From-Job': data[i][3],
                'To-Job': data[i][6],
            })



    return  JsonData

