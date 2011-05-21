/**
 * jQuery Interface ColorPicker
 *
 * NEED JQUERY 1.1 AND INTERFACE 1.1
 *
 *
 * @name ColorPicker
 * @description This a jQuery (Interface) ColorPicker.
 * @option String inputHexCode An input id (type hidden or text) to fill with the hex code of the chosen color
 * @option String objShowColor An object id (div, td ...) to fill with the chosen color
 * @option Boolean showRGB Show the R,G,B elements in the colorPicker
 * @option String okFunc The function (name of the function) to launch when 'OK' is pressed and inputHexCode is filled
 *
 * @type jQuery
 * @cat Plugins/Interface
 * @author Stefan Petre - Matthieu Paineau
 *
 *
 * READ 'howto_color_picker.txt' for information.
 *
 * TODO:
 * 		setcolor
 *		update automatically colors and cursors when we enter text into R, G, B, or hexvalue ...
 *
**/
jQuery.ColorPicker = {
	options : {
		inputHexCode		: "hexcode",
		objShowColor		: "divcolor",
		showRGB				: true,
		okFunc				: null
	},
	baseColor : {r:255,g:0,b:0},
	currentColor : {r:255,g:255,b:255},
	lastValues : [0,0],
	opened : false,

	init : function(options)
	{
		if (options)
			jQuery.extend(jQuery.ColorPicker.options, options);

		jQuery.ColorPicker.createPicker();
		jQuery.ColorPicker.baseColor = {r:255,g:0,b:0};
		jQuery.ColorPicker.currentColor = {r:255,g:255,b:255};
		jQuery.ColorPicker.lastValues = [0,0];
		jQuery.ColorPicker.setVertColor(0);
		jQuery.ColorPicker.setGradientColor();

		jQuery('#cPcolorContainer').Slider(
			{
				accept : '#cPcolorIndic',
				onSlide : function( cordx, cordy,x, y)
				{
					jQuery.ColorPicker.lastValues = [parseInt(cordx * 255/100),parseInt(cordy * 255/100)];
					jQuery.ColorPicker.setGradientColor();
				},
				onChange : function()
				{
					document.getElementById('cPoldColor').style.backgroundColor = 'rgb(' + jQuery.ColorPicker.currentColor.r + ',' + jQuery.ColorPicker.currentColor.g + ',' + jQuery.ColorPicker.currentColor.b + ')';
				}
			}
		);

		jQuery('#cPhue').Slider(
			{
				accept : '#cPhueIndic',
				onSlide : function( cordx, cordy,x, y)
				{
					jQuery.ColorPicker.setVertColor(parseInt(cordy * 255 / 100));
					jQuery.ColorPicker.setGradientColor();
				},
				onChange : function()
				{
					document.getElementById('cPoldColor').style.backgroundColor = 'rgb(' + jQuery.ColorPicker.currentColor.r + ',' + jQuery.ColorPicker.currentColor.g + ',' + jQuery.ColorPicker.currentColor.b + ')';
				}
			}
		);


		//attach the colorpicker :
		jQuery('a').each(
			function()
			{
				el 				= jQuery(this);
				relAttr 		= el.attr('rel')||'';
				if (relAttr.toLowerCase().indexOf('colorpicker') == 0) {
					el.attr("attached",true);
					el.bind('click', jQuery.ColorPicker.cPShow);
				}
			}
		);

	},


	setVertColor : function(indic){
		var n=256/6, j=256/n, C=indic, c=C%n;

		jQuery.ColorPicker.baseColor = {
			r : parseInt(C<n?255:C<n*2?255-c*j:C<n*4?0:C<n*5?c*j:255),
			g : parseInt(C<n*2?0:C<n*3?c*j:C<n*5?255:255-c*j),
			b : parseInt(C<n?c*j:C<n*3?255:C<n*4?255-c*j:0)
		};
		document.getElementById('cPcolor').style.backgroundColor = 'rgb(' + jQuery.ColorPicker.baseColor.r + ',' + jQuery.ColorPicker.baseColor.g + ',' + jQuery.ColorPicker.baseColor.b + ')';
	},


	setGradientColor : function(){
		var r = Math.round((1-(1-(jQuery.ColorPicker.baseColor.r/255))*(jQuery.ColorPicker.lastValues[0]/255))*(255-jQuery.ColorPicker.lastValues[1]));
		var g = Math.round((1-(1-(jQuery.ColorPicker.baseColor.g/255))*(jQuery.ColorPicker.lastValues[0]/255))*(255-jQuery.ColorPicker.lastValues[1]));
		var b = Math.round((1-(1-(jQuery.ColorPicker.baseColor.b/255))*(jQuery.ColorPicker.lastValues[0]/255))*(255-jQuery.ColorPicker.lastValues[1]));
		document.getElementById('cPcolorCurrent').style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

		if(jQuery.ColorPicker.showRGB){
			document.getElementById('cPrgbR').value = r;
			document.getElementById('cPrgbG').value = g;
			document.getElementById('cPrgbB').value = b;
		}
		document.getElementById('cPhex').value = (jQuery.ColorPicker.toHex(r) + jQuery.ColorPicker.toHex(g) + jQuery.ColorPicker.toHex(b)).toUpperCase();
		jQuery.ColorPicker.currentColor = {r:r,g:g,b:b};
	},

	toHex : function(color){
		color=parseInt(color).toString(16);
		return color.length<2?"0"+color:color;
	},


	/**
	 *
	 * return hex code into specified input
	 **/
	cPok : function(){
		jQuery('#'+jQuery.ColorPicker.inputHexCode).attr("value",jQuery("#cPhex").attr("value"));
		jQuery('#'+jQuery.ColorPicker.objShowColor).css("background-color","#"+jQuery("#cPhex").attr("value"));
		jQuery.ColorPicker.cPclose();
		if (jQuery.ColorPicker.okFunc) {
			try{
				eval(jQuery.ColorPicker.okFunc+"();");
			}
			catch(err){
				//do nothing if okfunc fails ?
			}
		}

	},

	/**
	 * close the picker
	**/
	cPclose : function(){
		jQuery("#cPcolorPicker").css("visibility","hidden");
		jQuery.ColorPicker.opened=false;
	},

	/**
	 * set the specified color into colorPicker (set cursors positions...)
	**/
	setcolor : function(){
		var couleur_orig = jQuery("#"+jQuery.ColorPicker.inputHexCode).attr("value");

		if (typeof(couleur_orig)!="undefined") {

			//alert("setcolor "+couleur_orig+" into colorPicker !");

			//set #cPcolorIndic position (vertical)

			//set #cPhueIndic position (vertical and horizontal)

			//set #cPcolorCurrent color

			//set #cPoldColor color

			//set #cPrgbR, #cPrgbG, #cPrgbB, #cPhex values :

		}

	},

	/**
	 * Show the colorPicker
	**/
	cPShow : function(e,options){

		if (!jQuery.ColorPicker.opened) {
			//attached
			el = jQuery(this);
			if (el.attr("attached")) {
				//parse to find options :
				var relAttr = el.attr('rel');
				var opts = relAttr.split('&');

				var oc="";
				var os="";
				var osr="";
				var okf="";

				for(var i=0;i<opts.length;i++){
					var data = opts[i];
					var matchobjcode = data.match(/objcode\=(.*)/gi);
					var matchobjshow = data.match(/objshow\=(.*)/gi);
					var matchshowrgb = data.match(/showrgb\=(.*)/gi);
					var matchokfunc = data.match(/okfunc\=(.*)/gi);

					if(matchobjcode){
						oc=matchobjcode[0].split("=");
						oc = oc[1];
					}
					if(matchobjshow){
						os=matchobjshow[0].split("=");
						os = os[1];
					}
					if(matchshowrgb){
						osr=matchshowrgb[0].split("=");
						osr = osr[1];
						if (osr=="1" || osr==true) {
							osr=true;
						}
						else{
							osr=false;
						}
					}
					if(matchokfunc){
						okf=matchokfunc[0].split("=");
						okf = okf[1];
					}
				}


				var emptyopts=true;
				if (oc!="") {
					jQuery.ColorPicker.inputHexCode=oc;
					emptyopts=false;
				}
				if (os!="") {
					jQuery.ColorPicker.objShowColor = os;
					emptyopts=false;
				}
				if (osr!="") {
					jQuery.ColorPicker.showRGB = osr;
					emptyopts=false;
				}
				if (okf!="") {
					jQuery.ColorPicker.okFunc = okf;
					emptyopts=false;
				}

				if(!emptyopts){
					jQuery.ColorPicker.init();
				}
			}

			//options allow to re-init at show
			if (options){
				jQuery.extend(jQuery.ColorPicker.options, options);
				jQuery.ColorPicker.init(options);
			}

			var code_couleur = jQuery("#"+jQuery.ColorPicker.options.inputHexCode).attr("value");

			jQuery.ColorPicker.setcolor(code_couleur);

			var X = jQuery.ColorPicker.getCoord(e,'X');
			var Y = jQuery.ColorPicker.getCoord(e,'Y');
			jQuery("#cPcolorPicker").css("top", -(-Y-10)+"px");
			jQuery("#cPcolorPicker").css("left", X+"px");
			jQuery("#cPcolorPicker").css("visibility","visible");
			jQuery.ColorPicker.opened=true;
		}
	},


	/**
	 * replace this function by a jquery.iutils one...
	**/
	getCoord : function(e,what) {
		var ie5=document.all && document.getElementById;

		  if (ie5) {
		      var Xvar = event.x;
			  var Yvar = event.y;
		  }
		  else {
		      var Xvar = e.pageX;
		      var Yvar = e.pageY;
		  }


		  what = what.toUpperCase();
		  switch(what){
		  		case 'X': 	return Xvar;
							break;

		  		case 'Y': 	return Yvar;
							break;
		  	}
	},

/*

	return_code: function(obj_div){
		var k=obj_div.style.backgroundColor;
		var j=(k.substr(4,k.indexOf(")")-4)).split(",");
		var c=new Object();
		c.r=j[0];
		c.g=j[1];
		c.b=j[2];
		objcode.value=rg2html(c);
		objcc.style.visibility='hidden';

		if(myfonc) eval(myfonc);
	},

*/


	/**
	 *
	 * Create the picker structure :
	 **/
	createPicker : function(){

		var cpcp = document.createElement("div");
		cpcp.id="cPcolorPicker";

		var cpclose = document.createElement("div");
		cpclose.id="cPclose";
		var closelink = document.createElement("a");
			closelink.href="javascript:jQuery.ColorPicker.cPclose();";
		var closelinktext = document.createTextNode("X");

		closelink.appendChild(closelinktext);
		cpclose.appendChild(closelink);

		var cpccont = document.createElement("div");
		cpccont.id="cPcolorContainer";

		var cpc = document.createElement("div");
		cpc.id="cPcolor";

		var cpci = document.createElement("div");
		cpci.id="cPcolorIndic";

		var cph = document.createElement("div");
		cph.id="cPhue";

		var cphi = document.createElement("div");
		cphi.id="cPhueIndic";

		var cpcc = document.createElement("div");
		cpcc.id="cPcolorCurrent";

		var cpoc = document.createElement("div");
		cpoc.id="cPoldColor";

		var cpcv = document.createElement("div");
		cpcv.id="cPcolorValues";

		// form :
		var f = document.createElement("form");
			f.name="cpicker";
			f.method="post";


		// ----- table dans form:
		var tcv = document.createElement("table");
		var tbodycv = document.createElement("tbody");

		if(jQuery.ColorPicker.showRGB){
				var tr1cv = document.createElement("tr");
				var td1cv1 = document.createElement("td");
				var td1cv1txt = document.createTextNode("R:");
					td1cv1.appendChild(td1cv1txt);

				var td1cv2 = document.createElement("td");
				var input_td1cv2 = document.createElement("input");
					input_td1cv2.type="text";
					input_td1cv2.style.width="30px";
					input_td1cv2.id="cPrgbR";
					input_td1cv2.value="255";
				td1cv2.appendChild(input_td1cv2);
				tr1cv.appendChild(td1cv1);
				tr1cv.appendChild(td1cv2);
				tbodycv.appendChild(tr1cv);

				var tr2cv = document.createElement("tr");
				var td2cv1 = document.createElement("td");
				var td2cv1txt = document.createTextNode("G:");
					td2cv1.appendChild(td2cv1txt);

				var td2cv2 = document.createElement("td");
				var input_td2cv2 = document.createElement("input");
					input_td2cv2.setAttribute("type","text");
					input_td2cv2.style.width="30px";
					input_td2cv2.id="cPrgbG";
					input_td2cv2.value="255";
				td2cv2.appendChild(input_td2cv2);
				tr2cv.appendChild(td2cv1);
				tr2cv.appendChild(td2cv2);
				tbodycv.appendChild(tr2cv);

				var tr3cv = document.createElement("tr");
				var td3cv1 = document.createElement("td");
				var td3cv1txt = document.createTextNode("B:");
					td3cv1.appendChild(td3cv1txt);

				var td3cv2 = document.createElement("td");
				var input_td3cv2 = document.createElement("input");
					input_td3cv2.type="text";
					input_td3cv2.style.width="30px";
					input_td3cv2.id="cPrgbB";
					input_td3cv2.value="255";
				td3cv2.appendChild(input_td3cv2);
				tr3cv.appendChild(td3cv1);
				tr3cv.appendChild(td3cv2);
				tbodycv.appendChild(tr3cv);
		}//if rgb

		var tr4cv = document.createElement("tr");
		var td4cv1 = document.createElement("td");
		td4cv1.style.verticalAlign='top';
		var td4cv1txt = document.createTextNode("#");
		td4cv1.appendChild(td4cv1txt);

		var td4cv2 = document.createElement("td");
		var input_td4cv2 = document.createElement("input");
			input_td4cv2.type="text";
			input_td4cv2.style.width="60px";
			input_td4cv2.id="cPhex";
			input_td4cv2.value="FFFFFF";
		td4cv2.appendChild(input_td4cv2);

			///bouton 'ok':
			var bok = document.createElement("input");
				bok.type="button";
				bok.id="cPbuttok";
				bok.value="OK";
				bok.onclick = jQuery.ColorPicker.cPok;

		td4cv2.appendChild(bok);

		tr4cv.appendChild(td4cv1);
		tr4cv.appendChild(td4cv2);

		tbodycv.appendChild(tr4cv);
		tcv.appendChild(tbodycv);
		// ----- fin table


		//cpc.appendChild(cpci);
		cpccont.appendChild(cpc);
		cpccont.appendChild(cpci);
		cpcp.appendChild(cpccont);

		cph.appendChild(cphi);
		cpcp.appendChild(cph);

		cpcc.appendChild(cpoc);
		cpcp.appendChild(cpcc);

		f.appendChild(tcv);
		cpcv.appendChild(f);
		cpcp.appendChild(cpcv);

		cpcp.appendChild(cpclose);


		jQuery("body").prepend(cpcp);
	}


}; //end!

