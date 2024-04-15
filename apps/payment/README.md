-to build the docker image
docker build ../../ -f Dockerfile -t slpr_payment

-to run the docker container:
docker run slpr_payment

-to run the project
npm run start:dev payment
