wb102 missing M and N
√MC116/117 IS WC OR MC?
OUTDOOR chair has tables in it?!...
all maitre d stand mahogany?
√ AC2424 come with base...right?! AC24R?
√BC6103 is bar height right?
LD32 says "Lazy Sushi" hahahahahahahahah
Japanese glass plate set..comes with what?!
need dimensions for the wooden screens
add a redirect, if only 1 type then go directly there
√vtm note, 1-3/4' thick
there are two mt-002
fiberglass top link is wrong....
wallpaper link is wrong...
b4w-single is not a single...
b6 bottom slightly cut
b63 bottom pic cut
all images are 500x500 png
metal laminate, edge options? thickness?
DVT VS VT?

In directory, each folder with actual image needs a
  [directoryName].json file which has a JSON object for each picture, with info field
  swap all '-' char in the name for '_'

App runs on the generated directory.js in the data directory
  to generate directory.js from filstructure, run gen.sh from public/script



todo:
get actual bootstrap not minfied link CDN
read in categories from json instead
√fix item toggle with up/down
√category/all view button
dropdown sizing is wrong
√arrow in history is weird
√at items, when sidebar is up still see highlighted item name tab
IE button group at home page is messed up
Add 404 page and if item/category is not found


To add new Category:
 1- create the folder
 2- add it to this.categoryKeys at app.js
 3- make a !angle folder inside to store all angle pictures

To add new Type:
 1- create the folder
 2- create !data.json to store all items inside this type

To add new Item:
 1- add image for the item
 2- fill out field for image in !data.json

To add attr of item:
 1- add attr in gen.sh so it is read in
 2- add attr to the json file for the item
 3- read in attr at item.js
 4- if custom handling such as arry attr, add to this.mainKeyCustom list

*Run gen.sh at public/script to generate directory.js when changing file structure*

JSON attributes
  info: some info to be displayed, ie cushion in the picture
  seat: seat color
  color: just COLOR
  thickness: of table
  image_info: what image is shown as
  frame_color: color of the frame, metal
  back_color: color of the back/seat
  seating: all seating options available as array, name linked to note data
  size: all size options, as array, name linked to note data
  tags: assosiated search tags, i.e. "clearance" as array
  angles: all pictures to show angles of the product, stored in
      category/!angles folder
