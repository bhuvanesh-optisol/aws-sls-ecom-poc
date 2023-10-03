# aws-sls-ecom-poc

Architectural diagram for ecom-serverless project
<img src="/ecom-poc.png" alt="My cool logo" height="600" width="800"/>

Documentation for ecom-serverless project
Download and open the document file

To deploy the serverless project
sls deploy

For deploying the selected version, use the below command

sls deploy -f function-name

To see the function logs by using tail
sls logs -f function-name -t
To invoke the cron job
sls invoke -f functionname

To invoke the cron job with logs
sls invoke -f function-name -l

Withdraw Deployment

sls remove

Steps to Do Before Deployment Configure the aws access key and access token and region and format as yaml

Provide neccessary iam policies for this POC.

Job is running on ecom-inventory-service
Function name - notifyProducts