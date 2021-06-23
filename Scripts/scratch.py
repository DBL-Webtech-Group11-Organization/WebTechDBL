import pandas as pd
import numpy as np

pdData = pd.read_csv("csv_files/enron-v1.csv")
data = pdData.to_numpy()
list_of_jobs = [item[3] for item in data]
numbers, uniques = pd.factorize(list_of_jobs, sort=True)
numbers = numbers.tolist()
for i in range(len(numbers)):

    print(numbers[i])
    print(list_of_jobs[i])
    print()