www.metrofurnitureny.com
For generating the UI of the site. Use gen.sh as script folder when making changes to the directory structure to generate a new directory.js. 


In directory, each folder with actual image needs a <br>
-  [directoryName].json file which has a JSON object for each picture, with info field <br>
-  swap all '-' char in the name for _ <br>
-  all images are 3000x3000 png <br>
-  corresponding image at /icon is 300x300 png <br>

App runs on the generated directory.js in the data directory <br>
-  to generate directory.js from filstructure, run gen.sh from public/script <br>



todo: <br>
- get actual bootstrap not minfied link CDN <br>
- √fix item toggle with up/down <br>
- √category/all view button <br>
- dropdown sizing is wrong <br>
- √arrow in history is weird <br>
- √at items, when sidebar is up still see highlighted item name tab <br>
- √IE button group at home page is messed up <br>
- Add 404 page and if item/category is not found <br>
- Add in info for each item <br>
- Generate sever for add/drop/edit item/cat/type <br>



To add new Category: <br>
- 1- create the folder <br>
- 2- add it to this.categoryKeys at app.js <br>
- 3- make a !angle folder inside to store all angle pictures <br>

To add new Type: <br>
- 1- create the folder <br>
- 2- create !data.json to store all items inside this type <br>

To add new Item: <br>
- 1- add image for the item <br>
- 2- fill out field for image in !data.json <br>

To add attr of item: <br>
- 1- add attr in gen.sh so it is read in <br>
- 2- add attr to the json file for the item <br>
- 3- read in attr at item.js <br>
- 4- if custom handling such as arry attr, add to this.mainKeyCustom list <br>

*Run gen.sh at public/script to generate directory.js when changing file structure* <br>

JSON attributes <br>
-  info: some info to be displayed, ie cushion in the picture <br>
-  seat: seat color <br>
-  color: just COLOR <br>
-  thickness: of table <br>
-  image_info: what image is shown as <br>
-  frame_color: color of the frame, metal <br>
-  back_color: color of the back/seat <br>
-  seating: all seating options available as array, name linked to note data <br>
-  size: all size options, as array, name linked to note data <br>
-  tags: assosiated search tags, i.e. "clearance" as array <br>
-  angles: all pictures to show angles of the product, stored in <br>
--      category/!angles folder <br>
