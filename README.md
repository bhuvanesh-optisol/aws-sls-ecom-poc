# aws-sls-ecom-poc

<b>Architectural diagram for ecom-serverless project</b>
<img src="/ecom-poc.png" alt="My cool logo" height="600" width="800"/>

<b>Documentation for ecom-serverless project</b>
Download and open the document file

<b>To deploy the serverless project</b>
sls deploy

<b>For deploying the selected version, use the below command</b>
sls deploy -f function-name

<b>To see the function logs by using tail</b>
sls logs -f function-name -t

<b>To invoke the cron job</b>
sls invoke -f functionname

<b>To invoke the cron job with logs</b>
sls invoke -f function-name -l

<b>Withdraw Deployment</b>

sls remove

<b>Steps to Do Before Deployment Configure the aws access key and access token and region and format as yaml</b>

<b>Provide neccessary iam policies for this POC</b>

<b>Cron Job</b>
Job is running on ecom-inventory-service
Function name - notifyProducts