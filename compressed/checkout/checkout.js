(function(){var b=window.cashmusic;b.stripe={eventAttached:!1,getYears:function(){for(var b=(new Date).getFullYear(),f={},c=0;20>c;c++)f[b]=b,b++;return f},generateToken:function(b,f){var c=window.cashmusic;c.embedded?c.events.fire(c,"stripetokenrequested",params):c.loadScript("https://js.stripe.com/v2/",function(){var a=[];a.push({id:"name",type:"text",placeholder:"Cardholder name"});a.push({id:"email",type:"email",placeholder:"Email address"});a.push({id:"card-number",type:"text",placeholder:"Credit card number"});
a.push({id:"card-expiry-month",type:"select",options:{"01":"01: Jan","02":"02: Feb","03":"03: Mar","04":"04: Apr","05":"05: May","06":"06: Jun","07":"07: Jul","08":"08: Aug","09":"09: Sep",10:"10: Oct",11:"11: Nov",12:"12: Dec"},value:"01"});a.push({id:"card-expiry-year",type:"select",options:c.stripe.getYears(),placeholder:(new Date).getFullYear()});a.push({id:"card-cvc",type:"text",placeholder:"CVV"});a.push({id:"stripe-submit",type:"submit",text:"Submit Payment"});c.userinput.getInput(a,"getstripetoken",
null,"");c.stripe.eventAttached||(c.events.add(c,"userinput",function(a){"getstripetoken"==a.detail["cm-userinput-type"]&&(Stripe.setPublishableKey(b),Stripe.card.createToken({name:a.detail.name,number:a.detail["card-number"],cvc:a.detail["card-cvc"],exp_month:a.detail["card-expiry-month"],exp_year:a.detail["card-expiry-year"]},function(b,d,e){d.error?(document.getElementById("cm-userinput-message").innerHTML=d.error.message,c.styles.addClass(document.getElementsByClassName("cm-userinput-container")[0],
"nope"),setTimeout(function(){c.styles.removeClass(document.getElementsByClassName("cm-userinput-container")[0],"nope")},800)):(c.storage.checkoutdata.stripe=d.id,c.storage.checkoutdata.name=a.detail.name,c.storage.checkoutdata.email=a.detail.email,c.events.fire(c,"checkoutdata",c.storage.checkoutdata,f),c.overlay.reveal('<div class="cm-loading"></div>'))}))}),c.stripe.eventAttached=!0)})}};b.userinput={getInput:function(d,f,c,a){f=f||"unknown";var g=document.createElement("form"),l=document.createElement("div");
l.className="cm-userinput-container";var m=document.createElement("div");m.id="cm-userinput-message";m.innerHTML="&nbsp;";a&&(m.innerHTML=a);g.className="cm-userinput "+f+" "+c;d.push({id:"cm-userinput-type",type:"hidden",value:f});for(c=0;c<d.length;c++){var e=d[c];if("submit"!==e.type&&"select"!==e.type)a=document.createElement("input"),a.type=e.type,a.placeholder=e.placeholder,e.value&&(a.value=e.value);else if("select"==e.type){a=document.createElement("select");var h=Object.keys(e.options);h.sort(function(b,
a){return b-a});for(var k=0;k<h.length;k++){var n=document.createElement("option");n.value=h[k];n.text=e.options[h[k]];e.value==h[k]&&(n.selected="selected");a.appendChild(n)}}else a=document.createElement("button"),a.type="submit",a.innerHTML=e.text;a.name=e.id;a.id="cm-userinput-"+f+"-"+e.id;e.required&&a.setAttribute("data-required","1");"stripe-submit"==e.id&&b.storage.checkoutdata.total&&(e=document.createElement("div"),e.id="cm-amount-message",e.innerHTML='<p class="cm-pricing">Transaction amount: '+
b.storage.checkoutdata.total+"</p>\x3c!--cm-pricing--\x3e",g.appendChild(e));g.appendChild(a)}l.appendChild(m);l.appendChild(g);b.events.add(g,"submit",function(a){a.preventDefault();a.stopPropagation();for(var c={},d=!1,e=0;e<g.elements.length;e++)a=g.elements[e],c[a.name]=a.value,a.getAttribute("data-required")&&""==a.value?(d=!0,b.styles.addClass(a,"incomplete")):b.styles.removeClass(a,"incomplete");d?(document.getElementById("cm-userinput-message").innerHTML="Please complete all required fields.",
b.styles.addClass(document.getElementsByClassName("cm-userinput-container")[0],"nope"),setTimeout(function(){b.styles.removeClass(document.getElementsByClassName("cm-userinput-container")[0],"nope")},800)):b.events.fire(b,"userinput",c)});b.overlay.reveal(l)}};b.checkout={prepped:!1,countries:{AF:"Afghanistan",AX:"\u00c5land Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",
AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BQ:"Bonaire, Saint Eustatius and Saba",BA:"Bosnia-Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",BN:"Brunei Darussalam",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",
TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos (Keeling) Islands",CO:"Colombia",KM:"Comoros",CG:"Congo",CD:"Congo, the Democratic Republic of the",CK:"Cook Islands",CR:"Costa Rica",CI:"C\u00f4te d\u2019Ivoire",HR:"Croatia",CU:"Cuba",CW:"Curacao",CY:"Cyprus",CZ:"Czech Republic",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands",FO:"Faroe Islands",
FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island and McDonald Islands",VA:"Holy See (Vatican City State)",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran, Islamic Republic of",
IQ:"Iraq",IE:"Ireland",IM:"Isle of Man",IL:"Israel",IT:"Italy",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",KP:"North Korea",KR:"Korea",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Lao People\u2019s Democratic Republic",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libyan Arab Jamahiriya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia, the former Yugoslav Republic of",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",
MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia, Federated States of",MD:"Moldova, Republic of",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",
PS:"Palestinian Territory, Occupied",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",RE:"R\u00e9union",RO:"Romania",RU:"Russian Federation",RW:"Rwanda",BL:"Saint Barth\u00e9lemy",SH:"Saint Helena, Ascension and Tristan da Cunha",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",MF:"Saint Martin (French part)",PM:"Saint Pierre and Miquelon",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome and Principe",
SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SX:"Sint Maarten (Dutch part)",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syrian Arab Republic",TW:"Taiwan, Province of China",TJ:"Tajikistan",TZ:"Tanzania, United Republic of",TH:"Thailand",TL:"Timor-Leste",
TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",US:"United States",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VE:"Venezuela, Bolivarian Republic of",VN:"Viet Nam",VG:"Virgin Islands, British",VI:"Virgin Islands, U.S.",WF:"Wallis and Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"},prep:function(){b.checkout.prepped||
(b.styles.injectCSS(b.path+"/templates/checkout.css",!1,!0),b.checkout.prepped=!0)},begin:function(d,f){if(b.embedded)b.events.fire(b,"begincheckout",d);else if(b.checkout.prep(),b.storage.checkoutdata={stripe:!1,paypal:!1,shipping:!1,currency:!1,name:!1,email:!1,recurring:!1,origin:window.location.href,total:!1},"https:"!==location.protocol&&!0!==d.testing&&(d.stripe=!1),d.recurring&&(b.storage.checkoutdata.recurring=!0),d.total&&(b.storage.checkoutdata.total=d.total),d.shipping){var c=[];c.push({id:"name",
type:"text",placeholder:"Ship to name",required:!0},{id:"address1",type:"text",placeholder:"Shipping address 1",required:!0},{id:"address2",type:"text",placeholder:"Shipping address 2"},{id:"city",type:"text",placeholder:"City",required:!0},{id:"state",type:"text",placeholder:"State/Province/Region",required:!0},{id:"postalcode",type:"text",placeholder:"Postal code",required:!0});if(d.stripe||d.paypal){var a="US";if(d.currency)switch(d.currency){case "GBP":a="GB";break;case "AUD":a="AU";break;case "JPY":a=
"JP";break;case "CAD":a="CA";break;case "NZD":a="NZ";break;case "HKD":a="HK";break;case "MXN":a="MX";break;case "NOK":a="NO"}c.push({id:"country",type:"select",options:b.checkout.countries,value:a});d.recurring||"object"===typeof d.shipping&&c.push({id:"shipping-region",type:"select",options:{"":"Select shipping region",r1:d.shipping.r1,r2:d.shipping.r2},required:!0});c.push({id:"shipping-submit",type:"submit",text:"Set shipping info"});"object"===typeof d.shipping?b.userinput.getInput(c,"getshippingaddress",
"shipping"):b.userinput.getInput(c,"getshippingaddress","noshipping");b.events.add(b,"userinput",function(a){"getshippingaddress"==a.detail["cm-userinput-type"]&&(b.storage.checkoutdata.shipping=a.detail,b.checkout.initiatepayment(d,f))})}else b.checkout.showerror()}else b.checkout.initiatepayment(d,f)},initiatepayment:function(d,f){if(d.stripe&&!d.paypal)b.stripe.generateToken(d.stripe,f);else if(!d.stripe&&d.paypal)b.storage.checkoutdata.paypal=!0,b.events.fire(b,"checkoutdata",b.storage.checkoutdata,
f),b.overlay.reveal('<div class="cm-loading"></div>');else if(d.stripe&&d.paypal){var c=document.createElement("div");c.className="cm-checkout-choose";var a=document.createElement("span"),g=document.createElement("span");a.innerHTML="Pay with PayPal";a.className="pay-pp";g.innerHTML="Pay with a credit card";g.className="pay-cc";b.events.add(a,"click",function(a){a.preventDefault();a.stopPropagation();b.storage.checkoutdata.paypal=!0;b.events.fire(b,"checkoutdata",b.storage.checkoutdata,f);b.overlay.reveal('<div class="cm-loading"></div>')});
b.events.add(g,"click",function(a){a.preventDefault();a.stopPropagation();b.stripe.generateToken(d.stripe,f)});c.appendChild(a);c.appendChild(g);b.overlay.reveal(c)}else b.checkout.showerror()},showerror:function(d){b.overlay.reveal('<div class="cm-checkout-error">There are no valid payment types. Please add a payment connection. Check to make sure your site supports SSL (https) if you are using Stripe.</div>')}}})();
