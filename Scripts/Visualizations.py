import numpy as np
from extract_csv import *
#The python file for all the functions for the different visualizations
import pandas as pd

async def makeGraphs(data):
    data_0 = await extract_column(data, 0)
    unique_years = await unique(await year_from_date_time(data_0))
    dict_mail_traffic = await dict_mail_traffic_calculate(data_0)
    return await calculate_values_per_year(unique_years, dict_mail_traffic)

async def forceDirectedGraph(data):
    list_from_emails = await extract_column(data, 2)
    list_to_emails = await extract_column(data, 5)
    return list_from_emails, list_to_emails

def makeMatrix(data):
    #We have to first find how many ID's we have in the file
    largestID = 0
    for i in range(len(data)):
        if data[i][1] > largestID:
            largestID = data[i][1]
    #Create a 2-multidimensional array with the largestID length and set correct ID number to every column and row
    mailMatrix = np.zeros((largestID,largestID),dtype=int)
    for i in range(len(mailMatrix)):
        mailMatrix[0][i] = i
        mailMatrix[i][0] = i

    #Count how often any id send an email to another ID
    for i in range(1,largestID):
        for j in range(len(data)):
            if i == data[j][1]:
                mailMatrix[data[j][4] - 1][i - 1] += 1
    return mailMatrix


async def extract_column(data, n):
    return [item[n] for item in data]


async def year_from_date_time(dates):
    years_from_date = []
    for i in range(len(dates)):
        years_from_date.append(dates[i][0:4])
    return years_from_date


async def unique(original_list):
    unique_list = []
    for x in original_list:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list


async def calculate_values_per_year(unique_years, dict_email_traffic):
    mails_per_year = []
    for x in sorted(unique_years):
        temp_count = 0
        for key, value in dict_email_traffic.items():
            if x in key:
                temp_count += value
        mails_per_year.append([int(x), temp_count])
    return mails_per_year


async def dict_mail_traffic_calculate(data_0):
    return {i: data_0.count(i) for i in data_0}

