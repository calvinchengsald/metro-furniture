#unmigrate
cd storage;
data=$(ls);

for entry in ${data}
do
  mv ${entry} ../root/${entry};
done
cd ..;
