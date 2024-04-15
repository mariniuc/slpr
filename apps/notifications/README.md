-to build the docker image
docker build ../../ -f Dockerfile -t slpr_notifications

-to run the docker container:
docker run slpr_notifications

-to run the project
npm run start:dev notifications
