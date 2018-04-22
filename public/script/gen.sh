cd ../image;
str="export default [\\n";

getLS(){  #1 is file, 2 is tab

  data=$(ls);

  counter=0;
  for entry in ${data}
  do
    if [[ $entry == *".json"* ]] || [[ $entry == "directory.js" ]];  then
      continue
    fi
  #  str=${str}{\\\n$2name: \'${entry}\\n\' ;
    tabber=$2;
    str=`echo $str$2\{\\\n`
    tabber=$tabber\\t;
    str=`echo $str$tabber name: \'$entry\',\\\n`;
    if [ -d "${entry}" ] ; then

      str=`echo $str$tabber dirs: [\\\n`;

      cd ${entry};
      getLS "${file}" "$tabber\\t" "${entry}";
      cd ..;


      str=${str}$2\\t],\\\n ;

    else
      if [[ $entry != *".json"* ]] && [[ $entry != "directory.js" ]]; then
        changedName=${entry//-/_}
        changedName=${changedName/.png/""}
        changedName=${changedName/.jpg/""}
        if [ ! -f $3.json ]; then
            echo "$3.json is not found under /$3"
        else
          #  echo "parsing $entry at $3"
            add=`jq .$changedName.info $3.json`;
            str=`echo $str$tabber info: $add,\\\n`;
        fi
      fi


    fi


    str=${str}$2},\\\n ;


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
