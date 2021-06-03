We are group 11, and this is our prototype for the data visualization website

To start the website you will need to execute server.py. but before you can do this you will need all the extensions
listed in requirements.txt. These can be manually installed or with use of pip by using 
"pip install -r requirements.txt" while being in the python environment you want to use.




We are a bit behind on visualisation generation so we currently only have two visualisations
1. Force directed diagram (static, not dependent on data)
2. Data Chart


Once the server.py file is running you can (preferably) use Google Chrome to go to the address: http://127.0.0.1:5000/
On this address you can nagivate through the website but the visualisations will be located in "Data visualisation".
Here you can upload a file and then give it a name (just a plain name, no .csv) and then click visualise.

The Force-directed graph is already there before you upload data since it does not yet work with input data but uses
template information. The Chart graph takes a while to load since it checks all e-mails and puts them in date buckets.
Then it outputs the amount of emails sent in each year. (in the case of enron-v1)
