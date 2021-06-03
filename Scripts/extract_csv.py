
def extract_data(filePos):
    import pandas as pd
    import numpy as np
    #put the csv file in a pandas dataframe and then put it in a numpy array for easy use for graphs
    pdData = pd.read_csv(filePos)
    data = pdData.to_numpy()
    return data
