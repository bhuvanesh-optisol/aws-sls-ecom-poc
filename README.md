# aws-sls-ecom-poc
<img src="/ecom-poc.png" alt="My cool logo" height="200" width="200"/>

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