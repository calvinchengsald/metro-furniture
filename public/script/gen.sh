cd ../image;
str="export default [\\n";

getLS(){  #1 is file, 2 is tab

  data=$(ls);

  counter=0;
  for entry in ${data}
  do
    if [ -d "${entry}" ] ; then
#      echo -e $2\"${entry}\": { #>>$1;
      str=${str}$2\"${entry}\":{\\\n  ;
      cd ${entry};
      getLS "${file}" "$2\\t";
      cd ..;

  #    echo -e $2}, #>>$1;
      str=${str}$2},\\\n ;
    else
#      echo -e $2${counter} : \"${entry}\", #>>$1;
#      str=${str}$2${counter} : \"${entry}\",\\n ;
      str=`echo $str$2$counter : \"$entry\",\\\n`;

      counter=$((counter+1));

    fi

  done
}

file="directory.js";
echo "">${file};
tab="\\t";
getLS "${file}" "${tab}";
str=${str}\\n]\;;
#echo -e ${str};
echo -e ${str} >> ${file};
mv ${file} ../../src/data/${file};