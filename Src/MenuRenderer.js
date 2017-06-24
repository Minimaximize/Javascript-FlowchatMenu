var TitleObj;
var descObj;
var btnA;
var btnB;
var btnC;
var btnBack;
var menuStack = [0];
var index = 0;

/*
* Function for starting applet
*
*/
function SetUp(){
	TitleObj = document.getElementById('title');
	descObj = document.getElementById('details');
	btnA = document.getElementById('A');
	btnB = document.getElementById('B');
	btnC = document.getElementById('C');
	btnBack = document.getElementById('Back');
	setBackButtonTarget();
	unpackMenu(index);
}

/*
*Function used to interpret JSON object and unpack to HTML page
*
*selection: the index of the menu being displayed (index determined by post order traversal of Flowcahrt)
*
*/
function unpackMenu(selection){
	//Load Title
	TitleObj.innerHTML = menuJSON[selection].Title;
	//Load Description
	descObj.innerHTML = menuJSON[selection].Description.toString();
	//configure buttons
		unpackButton(btnA,0,selection);
		unpackButton(btnB,1,selection);
	if(menuJSON[selection].Buttons.length == 3){//If all buttons should be loaded
	btnC.style.display = 'block';
		unpackButton(btnC,2,selection)
	}else{
		//Hide button C
		btnC.style.display = 'none';
	}
}


/*
* Function used to interpret and unpack buttons in JSON file
*
* includes updating labels to those found at (index) depth of the JSON array and set intended target of buttons in HTML File
*
* target: Target Button being affected
* depth: Depth in the Buttons array in the JSON object
* selection: current index in the JSON array
*/
function unpackButton(target,depth,selection){
	//set target button text to Label in JSON file
	target.getElementsByTagName("h2")[0].innerHTML = menuJSON[selection].Buttons[depth].Label;
	//Set target button image src to image in JSON file
	target.getElementsByTagName("img")[0].src = menuJSON[selection].Buttons[depth].Image;
	
	if(typeof menuJSON[selection].Buttons[depth].Target == "number"){
		//if Target is a number, button should progress user through menu
			target.pressed = function(){
				//on button press, set back button to current menu index
				//setBackButtonTarget(index);
				menuStack.push(index);
				index = menuJSON[selection].Buttons[depth].Target;
				unpackMenu(index)};
		}else{
			//if target not a number, must be URL, set button to redirect to URL
			target.pressed = function(){location.href = menuJSON[selection].Buttons[depth].Target}
		}
}

/*
* Sets the function of the back button on the HTML form
*/
function setBackButtonTarget(){
	btnBack.pressed = function(){
		var next = menuStack.pop();
		if(next == null){
			unpackMenu(0);
		}else{
			unpackMenu(next);
		}
	}
}

var menuJSON = [
{
"Title":"Do you want protection for your Cat or Dog?",
"Description":"If your not sure what application to choose watch my video by clicking the link below and I&#39ll help you tackle your pet&#39s parasite problem and show you how to find the perfect medication for you and your pet&#39s lifestyle. Watch Now <br> - Dr Mark",
"Buttons":[
{"Label":"Dog", "Image":"dog.png", "Target":1},
{"Label":"Cat", "Image":"cat.png", "Target":13}
]},

{
"Title":"Do you Want a Topical, Collar or Oral application?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Topical", "Image":"test.png", "Target":2},
{"Label":"Oral", "Image":"", "Target":8},
{"Label":"Collar", "Image":"", "Target":"http://www.vetshopaustralia.com.au/seresto-C750.aspx"}
]},

{
"Title":"Do you want to protect from Ticks as well?",
"Description":"This is the description for question 3",
"Buttons":[
{"Label":"Yes", "Image":"", "Target":6},
{"Label":"No", "Image":"", "Target":3}
]},

{
"Title":"Do you want to combine Flea Control with Mites, Heartworm & Lice Control?",
"Description":"This is the description for question 4",
"Buttons":[
{"Label":"Yes", "Image":"", "Target":5},
{"Label":"No", "Image":"", "Target":4}
]},

{
"Title":"Do you want to treat All Stages of the Flea Life-Cycle?",
"Description":"This is the description for question 5",
"Buttons":[
{"Label":"Adult & Larvae", "Image":"", "Target":"http://www.vetshopaustralia.com.au/advantage-flea-C86.aspx"},
{"Label":"All Stages", "Image":"", "Target":"http://www.vetshopaustralia.com.au/activyl-C662.aspx"}
]},

{
"Title":"Do you want to treat & protect against Intestinal Worms?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Yes", "Image":"", "Target":"http://www.vetshopaustralia.com.au/advocate-C157.aspx"},
{"Label":"No", "Image":"", "Target":"http://www.vetshopaustralia.com.au/revolution-for-dogs-C85.aspx"}
]},

{
"Title":"Do you want to treat all Stages of the Flea Life-Cycle?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Adult Fleas", "Image":"", "Target":"http://www.vetshopaustralia.com.au/frontline-original-C258.aspx"},
{"Label":"All Stages", "Image":"", "Target":7}
]},

{
"Title":"Do you have a cat in the household?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Yes", "Image":"", "Target":"http://www.vetshopaustralia.com.au/frontline-plus-C84.aspx"},
{"Label":"No", "Image":"", "Target":"http://www.vetshopaustralia.com.au/advantix-C87.aspx"}
]},

{
"Title":"Would you prefer a Meaty Chew or Tablet?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Chew", "Image":"", "Target":9},
{"Label":"Tablet", "Image":"", "Target":11}
]},

{
"Title":"Do you want to treat for just Fleas, just fleas & ticks, or Fleas & other parasites?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Fleas", "Image":"", "Target":"http://www.vetshopaustralia.com.au/comfortis-C219.aspx"},
{"Label":"Fleas & Ticks", "Image":"", "Target":10},
{"Label":"Fleas & other", "Image":"", "Target":23}
]},

{
"Title":"Do you want a Monthly or 3-Monthly treatment?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"30 Days", "Image":"", "Target":"http://www.vetshopaustralia.com.au/nexgard-C566.aspx"},
{"Label":"90 Days", "Image":"", "Target":"http://www.vetshopaustralia.com.au/bravecto-C585.aspx"}
]},

{
"Title":"Do you want monthly treatment or short term?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"30 Days", "Image":"", "Target":12},
{"Label":"2-3 Days", "Image":"", "Target":"http://www.vetshopaustralia.com.au/capstar-C210.aspx"}
]},

{
"Title":"Would you prefer to treat Flea Eggs & Larvae or Adult Fleas & Heartworm?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Eggs & Larvae", "Image":"", "Target":"http://www.vetshopaustralia.com.au/program-tablets-C212.aspx"},
{"Label":"Adult & Heartworm", "Image":"", "Target":"http://www.vetshopaustralia.com.au/panoramis-C263.aspx"}
]},

{
"Title":"Do you want to treat for just Fleas, just Worms, or Fleas and Other Parasites?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Fleas", "Image":"", "Target":14},
{"Label":"Worms", "Image":"", "Target":18},
{"Label":"Fleas & Other", "Image":"", "Target":21}
]},

{
"Title":"Do you want a Collar, Oral or Topical Application?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Collar", "Image":"", "Target":"http://www.vetshopaustralia.com.au/seresto-C751.aspx"},
{"Label":"Oral", "Image":"", "Target":15},
{"Label":"Topical", "Image":"", "Target":17}
]},

{
"Title":"Do you want Monthly Treatment or Short Term?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"2-3 Days", "Image":"", "Target":"http://www.vetshopaustralia.com.au/capstar-C211.aspx"},
{"Label":"30 Days", "Image":"", "Target":16}
]},

{
"Title":"Do you want to treat Adult Fleas, or Flea Eggs & Larvae?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Adult", "Image":"", "Target":"http://www.vetshopaustralia.com.au/comfortis-C576.aspx"},
{"Label":"Eggs & Larvae", "Image":"", "Target":"http://www.vetshopaustralia.com.au/Default.aspx"}
]},

{
"Title":"Do you want to treat All Stages in the Flea Life-Cycle or just Adult & Larvae?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"All Stages", "Image":"", "Target":"http://www.vetshopaustralia.com.au/activyl-C659.aspx"},
{"Label":"Adult & Larvae", "Image":"", "Target":"http://www.vetshopaustralia.com.au/advantage-C91.aspx"}
]},

{
"Title":"Is your cat fussy or difficult when it comes to administering medication?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Yes", "Image":"", "Target":20},
{"Label":"No", "Image":"", "Target":19}
]},

{
"Title":"Do you want to treat from 2 Weeks of age or from 6 Weeks of age?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"2 Weeks", "Image":"", "Target":"http://www.vetshopaustralia.com.au/drontal-wormers-for-cats-C161.aspx"},
{"Label":"6 Weeks", "Image":"", "Target":"http://www.vetshopaustralia.com.au/RSPCA-Allwormer-C701.aspx"}
]},

{
"Title":"Would you prefer a Topical Application or a Liver Flavoured Tablet?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Topical", "Image":"", "Target":"http://www.vetshopaustralia.com.au/Profender-C254.aspx"},
{"Label":"Tablet", "Image":"", "Target":"http://www.vetshopaustralia.com.au/paragard-for-cats-C645.aspx"}
]},

{
"Title":"Would you prefer to treat for Fleas & Lice, of Fleas, Heartowrm, Intestinal Worms and Mites?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Fleas & Lice", "Image":"", "Target":"http://www.vetshopaustralia.com.au/frontline-plus-C89.aspx"},
{"Label":"Fleas, Heartworm, Intestinal Worms & Mites", "Image":"", "Target":22}
]},

{
"Title":"Do you want to treat for all Flea Life-Cycle Stages & Lice or just Adult Fleas & Larvae?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"All Stages & Lice", "Image":"", "Target":"http://www.vetshopaustralia.com.au/revolution-C135.aspx"},
{"Label":"Adult & Larvae", "Image":"", "Target":"http://www.vetshopaustralia.com.au/advocate-C156.aspx"}
]},

{
"Title":"Do you want to also treat for heartworm & intestinal worms, or tick mites and mange?",
"Description":"This is the description for question 2",
"Buttons":[
{"Label":"Heartworm and intestinalworms", "Image":"", "Target":"http://www.vetshopaustralia.com.au/sentinel-spectrum-C269.aspx"},
{"Label":"Tick mites and mange", "Image":"", "Target":"http://www.vetshopaustralia.com.au/simparica-C814.aspx"}
]}
]