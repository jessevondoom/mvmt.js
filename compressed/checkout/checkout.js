(function(){var b=window.cashmusic;b.stripe={eventAttached:!1,getYears:function(){for(var b=(new Date).getFullYear(),e={},a=0;20>a;a++)e[b]=b,b++;return e},generateToken:function(b,e){var a=window.cashmusic;a.embedded?a.events.fire(a,"stripetokenrequested",params):a.loadScript("https://js.stripe.com/v2/",function(){var c=[];c.push({id:"name",type:"text",placeholder:"Cardholder name"});c.push({id:"email",type:"email",placeholder:"Email address"});c.push({id:"card-number",type:"text",placeholder:"Credit card number"});
c.push({id:"card-expiry-month",type:"select",options:{"01":"01: Jan","02":"02: Feb","03":"03: Mar","04":"04: Apr","05":"05: May","06":"06: Jun","07":"07: Jul","08":"08: Aug","09":"09: Sep",10:"10: Oct",11:"11: Nov",12:"12: Dec"},value:"01"});c.push({id:"card-expiry-year",type:"select",options:a.stripe.getYears(),placeholder:(new Date).getFullYear()});c.push({id:"card-cvc",type:"text",placeholder:"CVV"});c.push({id:"stripe-submit",type:"submit",text:"Submit Payment"});a.userinput.getInput(c,"getstripetoken");
a.stripe.eventAttached||(a.events.add(a,"userinput",function(c){"getstripetoken"==c.detail["cm-userinput-type"]&&(Stripe.setPublishableKey(b),Stripe.card.createToken({name:c.detail.name,number:c.detail["card-number"],cvc:c.detail["card-cvc"],exp_month:c.detail["card-expiry-month"],exp_year:c.detail["card-expiry-year"]},function(b,d,g){d.error?(document.getElementById("cm-userinput-message").innerHTML=d.error.message,a.styles.addClass(document.getElementsByClassName("cm-userinput-container")[0],"nope"),
setTimeout(function(){a.styles.removeClass(document.getElementsByClassName("cm-userinput-container")[0],"nope")},800)):(a.storage.checkoutdata.stripe=d.id,a.storage.checkoutdata.name=c.detail.name,a.storage.checkoutdata.email=c.detail.email,a.events.fire(a,"checkoutdata",a.storage.checkoutdata,e),a.overlay.reveal('<div class="cm-loading"></div>'))}))}),a.stripe.eventAttached=!0)})}};b.userinput={getInput:function(d,e,a){e=e||"unknown";var c=document.createElement("form"),h=document.createElement("div");
h.className="cm-userinput-container";var n=document.createElement("div");n.id="cm-userinput-message";n.innerHTML="&nbsp;";c.className="cm-userinput "+e+" "+a;d.push({id:"cm-userinput-type",type:"hidden",value:e});for(a=0;a<d.length;a++){var f=d[a];if("submit"!==f.type&&"select"!==f.type){var g=document.createElement("input");g.type=f.type;g.placeholder=f.placeholder;f.value&&(g.value=f.value)}else if("select"==f.type){var g=document.createElement("select"),k=Object.keys(f.options);k.sort(function(b,
a){return b-a});for(var l=0;l<k.length;l++){var m=document.createElement("option");m.value=k[l];m.text=f.options[k[l]];f.value==k[l]&&(m.selected="selected");g.appendChild(m)}}else g=document.createElement("button"),g.type="submit",g.innerHTML=f.text;g.name=f.id;g.id="cm-userinput-"+e+"-"+f.id;f.required&&g.setAttribute("data-required","1");c.appendChild(g)}h.appendChild(n);h.appendChild(c);b.events.add(c,"submit",function(a){a.preventDefault();a.stopPropagation();for(var d={},e=!1,f=0;f<c.elements.length;f++)a=
c.elements[f],d[a.name]=a.value,a.getAttribute("data-required")&&""==a.value?(e=!0,b.styles.addClass(a,"incomplete")):b.styles.removeClass(a,"incomplete");e?(document.getElementById("cm-userinput-message").innerHTML="Please complete all required fields.",b.styles.addClass(document.getElementsByClassName("cm-userinput-container")[0],"nope"),setTimeout(function(){b.styles.removeClass(document.getElementsByClassName("cm-userinput-container")[0],"nope")},800)):b.events.fire(b,"userinput",d)});b.overlay.reveal(h)}};
b.checkout={prepped:!1,countries:{AF:"Afghanistan",AX:"\u00c5land Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BQ:"Bonaire, Saint Eustatius and Saba",BA:"Bosnia-Herzegovina",BW:"Botswana",
BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",BN:"Brunei Darussalam",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos (Keeling) Islands",CO:"Colombia",KM:"Comoros",CG:"Congo",CD:"Congo, the Democratic Republic of the",CK:"Cook Islands",CR:"Costa Rica",CI:"C\u00f4te d\u2019Ivoire",HR:"Croatia",CU:"Cuba",CW:"Curacao",
CY:"Cyprus",CZ:"Czech Republic",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands",FO:"Faroe Islands",FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",
GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island and McDonald Islands",VA:"Holy See (Vatican City State)",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran, Islamic Republic of",IQ:"Iraq",IE:"Ireland",IM:"Isle of Man",IL:"Israel",IT:"Italy",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",KP:"North Korea",KR:"Korea",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Lao People\u2019s Democratic Republic",
LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libyan Arab Jamahiriya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia, the former Yugoslav Republic of",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia, Federated States of",MD:"Moldova, Republic of",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",
MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestinian Territory, Occupied",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",RE:"R\u00e9union",RO:"Romania",RU:"Russian Federation",RW:"Rwanda",BL:"Saint Barth\u00e9lemy",
SH:"Saint Helena, Ascension and Tristan da Cunha",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",MF:"Saint Martin (French part)",PM:"Saint Pierre and Miquelon",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome and Principe",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SX:"Sint Maarten (Dutch part)",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",
ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syrian Arab Republic",TW:"Taiwan, Province of China",TJ:"Tajikistan",TZ:"Tanzania, United Republic of",TH:"Thailand",TL:"Timor-Leste",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",US:"United States",UY:"Uruguay",
UZ:"Uzbekistan",VU:"Vanuatu",VE:"Venezuela, Bolivarian Republic of",VN:"Viet Nam",VG:"Virgin Islands, British",VI:"Virgin Islands, U.S.",WF:"Wallis and Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"},prep:function(){b.checkout.prepped||(b.styles.injectCSS(b.path+"/templates/checkout.css",!1,!0),b.checkout.prepped=!0)},begin:function(d,e){if(b.embedded)b.events.fire(b,"begincheckout",d);else if(b.checkout.prep(),b.storage.checkoutdata={stripe:!1,paypal:!1,shipping:!1,currency:!1,
name:!1,email:!1,origin:window.location.href},"https:"!==location.protocol&&!0!==d.testing&&(d.stripe=!1),d.shipping){var a=[];a.push({id:"name",type:"text",placeholder:"Ship to name",required:!0},{id:"address1",type:"text",placeholder:"Shipping address 1",required:!0},{id:"address2",type:"text",placeholder:"Shipping address 2"},{id:"city",type:"text",placeholder:"City",required:!0},{id:"state",type:"text",placeholder:"State/Province/Region",required:!0},{id:"postalcode",type:"text",placeholder:"Postal code",
required:!0});if(d.stripe||d.paypal){var c="US";if(d.currency)switch(d.currency){case "GBP":c="GB";break;case "AUD":c="AU";break;case "JPY":c="JP";break;case "CAD":c="CA";break;case "NZD":c="NZ";break;case "HKD":c="HK";break;case "MXN":c="MX";break;case "NOK":c="NO"}a.push({id:"country",type:"select",options:b.checkout.countries,value:c});"object"===typeof d.shipping&&a.push({id:"shipping-region",type:"select",options:{"":"Select shipping region",r1:d.shipping.r1,r2:d.shipping.r2},required:!0});a.push({id:"shipping-submit",
type:"submit",text:"Set shipping info"});"object"===typeof d.shipping?b.userinput.getInput(a,"getshippingaddress","shipping"):b.userinput.getInput(a,"getshippingaddress","noshipping");b.events.add(b,"userinput",function(a){"getshippingaddress"==a.detail["cm-userinput-type"]&&(b.storage.checkoutdata.shipping=a.detail,b.checkout.initiatepayment(d,e))})}else b.checkout.showerror()}else b.checkout.initiatepayment(d,e)},initiatepayment:function(d,e){if(d.stripe&&!d.paypal)b.stripe.generateToken(d.stripe,
e);else if(!d.stripe&&d.paypal)b.storage.checkoutdata.paypal=!0,b.events.fire(b,"checkoutdata",b.storage.checkoutdata,e),b.overlay.reveal('<div class="cm-loading"></div>');else if(d.stripe&&d.paypal){var a=document.createElement("div");a.className="cm-checkout-choose";var c=document.createElement("span"),h=document.createElement("span");c.innerHTML="Pay with PayPal";c.className="pay-pp";h.innerHTML="Pay with a credit card";h.className="pay-cc";b.events.add(c,"click",function(a){a.preventDefault();
a.stopPropagation();b.storage.checkoutdata.paypal=!0;b.events.fire(b,"checkoutdata",b.storage.checkoutdata,e);b.overlay.reveal('<div class="cm-loading"></div>')});b.events.add(h,"click",function(a){a.preventDefault();a.stopPropagation();b.stripe.generateToken(d.stripe,e)});a.appendChild(c);a.appendChild(h);b.overlay.reveal(a)}else b.checkout.showerror()},showerror:function(d){b.overlay.reveal('<div class="cm-checkout-error">There are no valid payment types. Please add a payment connection. Check to make sure your site supports SSL (https) if you are using Stripe.</div>')}}})();
