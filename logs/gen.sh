
aws s3 cp s3://logs.www.metrofurnitureny.com/root root --recursive;
aws s3 rm s3://logs.www.metrofurnitureny.com/root --recursive;
cd root;
str="";
data=$(ls);

for entry in ${data}
do
  dateStr=$(echo $entry | cut -c 1-10);
  timeStr=$(echo $entry | cut -c 12-19);
  str=`echo ${str}${dateStr}\\\t${timeStr} \\\n`;
  mv ${entry} ../storage/${entry};
done
cd ..;
echo -e ${str} >> "data/data.tsv"

aws s3 cp data/data.tsv s3://logs.www.metrofurnitureny.com/
