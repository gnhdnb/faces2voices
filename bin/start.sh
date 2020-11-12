if [ -f .env ]
then
  export $(cat .env | xargs)
fi
if [ $PRODUCTION = "true" ]
then
  echo "Starting in prodcution mode"
  docker-compose -f ./docker-compose.yml up --build
else
  echo "Starting in development mode"
  docker-compose -f ./docker-compose.yml up --build
fi
