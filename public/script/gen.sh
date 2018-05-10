#TO BE EXECUTED AT ROOT FOLDER
cd ../image;
str="export default [\\n";

getLS(){  #1 is file, 2 is tab

  data=$(ls);

  for entry in ${data}
  do
    if [[ $entry == *".json"* ]] || [[ $entry == "directory.js" ]] || [[ $entry == "!"* ]] ;  then
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
      getLS "${file}" "$tabber\\t" "${entry}" "false";
      cd ..;


      str=${str}$2\\t],\\\n ;

    else
      if [[ $entry != *".json"* ]] && [[ $entry != "directory.js" ]]; then
        changedName=${entry//-/_}
        changedName=${changedName/.png/""}
        changedName=${changedName/.jpg/""}
        if [ ! -f !data.json ]; then
            echo "!data.json is not found under /$3"
        else
          #  echo "parsing $entry at $3"
            add=`jq .$changedName.info !data.json`;
            seating=`jq .$changedName.seating !data.json`;
            seat=`jq .$changedName.seat !data.json`;
            frame_color=`jq .$changedName.frame_color !data.json`;
            back_color=`jq .$changedName.back_color !data.json`;
            tags=`jq .$changedName.tags !data.json`;
            angles=`jq .$changedName.angles !data.json`;
            color=`jq .$changedName.color !data.json`;
            thickness=`jq .$changedName.thickness !data.json`;
            image_info=`jq .$changedName.image_info !data.json`;
            size=`jq .$changedName.size !data.json`;
            str=`echo $str$tabber info: $add,\\\n`;
            str=`echo $str$tabber seating: $seating,\\\n`;
            str=`echo $str$tabber seat: $seat,\\\n`;
            str=`echo $str$tabber frame_color: $frame_color,\\\n`;
            str=`echo $str$tabber back_color: $back_color,\\\n`;
            str=`echo $str$tabber color: $color,\\\n`;
            str=`echo $str$tabber thickness: $thickness,\\\n`;
            str=`echo $str$tabber image_info: $image_info,\\\n`;
            str=`echo $str$tabber tags: $tags,\\\n`;
            str=`echo $str$tabber angles: $angles,\\\n`;
            str=`echo $str$tabber size: $size,\\\n`;
        fi
      fi


    fi


    str=${str}$2},\\\n ;
    if [[ $4 == "true" ]]; then
      echo -ne 7-;
    fi

  done
}

counter=0;
file="directory.js";
tab="\\t";
getLS "${file}" "${tab}" "" "true";
echo " done";
str=${str}\\n]\;;
#echo -e ${str};
echo -e ${str} >> ${file};
mv ${file} ../../src/data/${file};
