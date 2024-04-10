-first you need to build the docker image
docker build ../../ -f Dockerfile -t slpr_reservations

-to run the docker container after the image was built:
docker run slpr_reservations

-to run the project
npm run start:dev reservations
