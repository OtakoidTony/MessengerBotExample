const Bitmap = android.graphics.Bitmap;
const BitmapFactory = android.graphics.BitmapFactory;
const Canvas = android.graphics.Canvas;
const Color = android.graphics.Color;
const Paint = android.graphics.Paint;
const Typeface = android.graphics.Typeface;

const Base64 = android.util.Base64;

function response(room, msg, sender, isGroupChat, replier, imageDB) {
	let command = msg.split(" ")[0];
	let arg = msg.split(" ").slice(1).join(" ");
	let seperator = "\u200b".repeat(500);
	
	if (msg.toLowerCase() == "/drawprofile") {
		let bitmap = convertBase64ToBitmap(imageDB.getProfileImage());
		let width = bitmap.getWidth();
		let height = bitmap.getHeight();
		let result = [];
			
		for (let j = 0; j < height; j += 12) {
			let line = [];
			
			for (let i = 0; i < width; i += 6) {
				let data = [true, false, false, false, false, false, false, false];
				
				for (let k = 0; k < 6 && (i + k) < width; k += 3) {
					for (let l = 0; l < 12 && (j + l) < height; l += 3) {
						let pixel = bitmap.getPixel(i + k, j + l);
						
						let red = (pixel & 0x00FF0000) >> 16;
						let green = (pixel & 0x0000FF00) >> 8;
						let blue = (pixel & 0x0000FF);
						
						let intensity = Math.floor(red * 0.3 + green * 0.59 + blue * 0.11);
						
						if (intensity <= 160)
							data[(k / 3) * 4 + l / 3] = true;
					}
				}
				
				line.push(getBraille(data));
			}
			
			result.push(line.join(""));
		}
						
		replier.reply("Braille Art 결과입니다." + seperator + "\n\n" + result.join("\n"));
	}
}


convertBase64ToBitmap = code => {
	let decodedStr = Base64.decode(code, Base64.DEFAULT);
	return BitmapFactory.decodeByteArray(decodedStr, 0, decodedStr.length);
}

getBraille = arr => {
	const MAP = [0, 1, 2, 6, 3, 4, 5, 7];
	let result = 0;

	arr.forEach((e, i) => {
		if (e) {
			result += Math.pow(2, MAP[i]);
		}
	});

	return String.fromCharCode(result + 10240);
}
