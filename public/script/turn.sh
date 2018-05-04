cd ../image;
str="export default [\\n";

getLS(){  #1 is file, 2 is tab

  data=$(ls);

  for entry in ${data}
  do
    if [[ $entry == *".json"* ]] ;  then
      mv $entry !data.json;
      continue
    fi
    if [[ $entry == "directory.js" ]];  then
      rm directory.js;
      continue
    fi
  #  str=${str}{\\\n$2name: \'${entry}\\n\' ;

    if [ -d "${entry}" ] ; then


      cd ${entry};
      getLS "${file}" "$tabber\\t" "${entry}" "false";
      cd ..;

    fi
  done
}

counter=0;
file="directory.js";
tab="\\t";
getLS "${file}" "${tab}" "" "true";
str=${str}\\n]\;;
#echo -e ${str};
echo -e ${str} >> ${file};
mv ${file} ../../src/data/${file};
