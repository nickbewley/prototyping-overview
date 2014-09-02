// -------------------------------------- File Input ----------------------------------------- //
// Set a variable so can show right and left arrows when more than 3 images
imagecount = 0;

// Creating the file input from your filesystem dialog
var upload = $("div[data-label='ImageDropArea']").find("div[data-label='Hover']");
$(upload).append("<input type='file' id='UploadInput' style='position:relative; opacity:0; font-size: 400px; width: 100%; height: 100%;'>");
$("div[data-label='ImageDropArea'] [data-label='Hover']").mouseout(function() { 
	$("div[data-label='ImageDropArea'] [data-label='Hover']").css({ 'visibility': 'hidden'}); 
	$("div[data-label='ImageDropArea'] [data-label='Initial']").css({ 'visibility': 'visible', 'display': ''});
 	$("[data-label='DragIcon'] [data-label='Initial']").css({ 'visibility': 'visible', 'display': ''});
 	$("[data-label='DragIcon'] [data-label='Shown']").css({ 'visibility': 'hidden', 'display': 'none'});
 	$("[data-label='SelectButton'] [data-label='Hover']").css({ 'visibility': 'hidden', 'display': 'none'});
 	$("[data-label='SelectButton'] [data-label='Initial']").css({ 'visibility': 'visible', 'display': ''});
 	$("[data-label='ImagePlaceholder']").css({ 'visibility': 'visible', 'display': ''});
});

function readURL2(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();		
		reader.onload = function (e) {
			imagecount = imagecount + 1;
			// put data-title='My caption' in the below style block if you want to display the caption
			var myNewImageElement = $("<div style='width: 55px; display:inline-block; position:static; margin-right: 4px; vertical-align: top;' data-lightbox='createassetlb' data-label='Carousel Image'><img class='onhover' style='cursor: pointer; float:left;  height: 100%; position: relative; width: 55px; margin-right: 4px;' src='" + e.target.result + "' /></div>'");
			$('[data-label="State1-thumbnails for carousel"] > div').prepend(myNewImageElement).css({'left': 'auto', 'top': 'auto', 'position': 'fixed', 'width': 'auto', 'height': 'auto', 'white-space': 'nowrap', 'height': '50px', 'width': '242px', 'left': 'auto', 'top': 'auto', 'position': 'static', 'height': 'auto', 'width': 'auto'});
			$('[data-label="CreateImages-Container"], [data-label="UploadText"]').css({'display': '', 'visibility': 'visible'});
				// if more than 3 images show arrows
				if (imagecount > 4) {
					$('[data-label="CreateImage-RArrow"]').css({'display': '', 'visibility': 'visible'});
				}
		}
		reader.readAsDataURL(input.files[0]);
	}
}

$('#UploadInput').change(function(){
	readURL2(this);
});


// -------------------------- Putting the Image into the Preview Location -------------------------------
$( document ).on( "click", '.onhover', function() {
	 $('[data-label="ImagePreview"] [data-label="State1"]').html($(this).clone().css('width', 'auto'));
});


//--------------------------------------- Drag and Drop Upload ---------------------------------------------- //
// http://robertnyman.com/2010/12/16/utilizing-the-html5-file-api-to-choose-upload-preview-and-see-progress-for-multiple-files/

(function () {
	var filesUpload = $("#UploadInput")[0],
		dropArea = $("[data-label='dragdrop box-create asset']")[0],
		fileList = $("[data-label='Thumbnails']")[0];

	function uploadFile (file) {
		var li = document.createElement("li"),
			div = document.createElement("div"),
			img,
			reader,
			xhr,
			fileInfo;
			
		li.appendChild(div);
		
		if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
			img = document.createElement("img");
			li.appendChild(img);
			reader = new FileReader();
			reader.onload = (function (theImg) {
				return function (evt) {
					theImg.src = evt.target.result;
				};
			}(img));
			reader.readAsDataURL(file);
		}
		
		// Uploading - for Firefox, Google Chrome and Safari
		xhr = new XMLHttpRequest();
				
		// Set appropriate headers
		xhr.setRequestHeader("Content-Type", "multipart/form-data");
		xhr.setRequestHeader("X-File-Name", file.name);
		xhr.setRequestHeader("X-File-Size", file.size);
		xhr.setRequestHeader("X-File-Type", file.type);

		// Send the file (doh)
		xhr.send(file);

		div.innerHTML = fileInfo;
		
		fileList.appendChild(li);
	}
	

	// putting the image into the prototype
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
		
			reader.onload = function (e) {
				imagecount = imagecount + 1;
				// put data-title='My caption' in the below style block if you want to display the caption
				var myNewImageElement = $("<div style='width: 55px; display:inline-block; position:static; margin-right: 4px; vertical-align: top;' data-lightbox='createassetlb' data-label='Carousel Image'><img class='onhover' style='cursor:pointer; float:left;  height: 100%; position: relative; width: 55px; margin-right: 4px;' src='" + e.target.result + "' /></div>'");
				$('[data-label="State1-thumbnails for carousel"] > div').prepend(myNewImageElement).css({'left': 'auto', 'top': 'auto', 'position': 'fixed', 'width': 'auto', 'height': 'auto', 'white-space': 'nowrap', 'height': '50px', 'width': '242px', 'left': 'auto', 'top': 'auto', 'position': 'static', 'height': 'auto', 'width': 'auto'});
				$('[data-label="CreateImages-Container"], [data-label="UploadText"]').css({'display': '', 'visibility': 'visible'});
				if (imagecount > 4) {
					$('[data-label="CreateImage-RArrow"]').css({'display': '', 'visibility': 'visible'});
				}
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	
	filesUpload.addEventListener("change", function () {
		traverseFiles(this.files);
	}, false);
	
	dropArea.addEventListener("dragleave", function (evt) {
		var target = evt.target;
		
		if (target && target === dropArea) {
			this.className = "";
		}
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("dragenter", function (evt) {
	console.log("Enter");
		this.className = "over";
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("dragover", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);
	
	dropArea.addEventListener("drop", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();

	console.log("Drop", evt);
	readURL(evt.dataTransfer);

			traverseFiles(evt.dataTransfer.files);
			this.className = "";
		}, false);
	console.log("Done binding listeners");									
	})();	


