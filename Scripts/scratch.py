import pandas as pd
import numpy as np
from Visualizations import *
import csv as csv
import json

pdData = pd.read_csv("csv_files/enron-v1.csv")
data = pdData.to_numpy()
nodes = []
links = []
id_sender_list = [item[1] for item in data]
id_receiver_list = [item[4] for item in data]
id_list = id_sender_list + id_receiver_list
unique_id_list = []
for x in id_list:
    if x not in unique_id_list:
        unique_id_list.append(x)
for i in unique_id_list:
    id = i
    nodes.append({"id": id})

for i in range(len(data)):
    id = "placeholder"
    source = data[i][1]
    target = data[i][4]
    weight = 4
    links.append({"id": id, "source": source, "target": target, "weight": weight})
jsonstring = {"nodes": nodes, "links": links}
with open('templates/graph.json', 'w') as outfile:
    json.dump(jsonstring, outfile, indent=4)

data = {}
with open("csv_files/enron-v1.csv") as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        id = rows["date"]
        data[id] = rows

with open('templates/enron-v1.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

