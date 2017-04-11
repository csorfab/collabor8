<?php

//TODO HACK

use App\Offer;




/*
--------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


function mime_content_type_hack($filename) {
	
	$mime_types = array(
	
	'txt' => 'text/plain',
							        'htm' => 'text/html',
							        'html' => 'text/html',
							        'php' => 'text/html',
							        'css' => 'text/css',
							        'js' => 'application/javascript',
							        'json' => 'application/json',
							        'xml' => 'application/xml',
							        'swf' => 'application/x-shockwave-flash',
							        'flv' => 'video/x-flv',
	
	// 	images
							        'png' => 'image/png',
							        'jpe' => 'image/jpeg',
							        'jpeg' => 'image/jpeg',
							        'jpg' => 'image/jpeg',
							        'gif' => 'image/gif',
							        'bmp' => 'image/bmp',
							        'ico' => 'image/vnd.microsoft.icon',
							        'tiff' => 'image/tiff',
							        'tif' => 'image/tiff',
							        'svg' => 'image/svg+xml',
							        'svgz' => 'image/svg+xml',
	
	// 	archives
							        'zip' => 'application/zip',
							        'rar' => 'application/x-rar-compressed',
							        'exe' => 'application/x-msdownload',
							        'msi' => 'application/x-msdownload',
							        'cab' => 'application/vnd.ms-cab-compressed',
	
	// 	audio/video
							        'mp3' => 'audio/mpeg',
							        'qt' => 'video/quicktime',
							        'mov' => 'video/quicktime',
	
	// 	adobe
							        'pdf' => 'application/pdf',
							        'psd' => 'image/vnd.adobe.photoshop',
							        'ai' => 'application/postscript',
							        'eps' => 'application/postscript',
							        'ps' => 'application/postscript',
	
	// 	ms office
							        'doc' => 'application/msword',
							        'rtf' => 'application/rtf',
							        'xls' => 'application/vnd.ms-excel',
							        'ppt' => 'application/vnd.ms-powerpoint',
	
	// 	open office
							        'odt' => 'application/vnd.oasis.opendocument.text',
							        'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
							    );
	
	$arr = explode('.',$filename);
	$ext = strtolower(array_pop($arr));
	if (array_key_exists($ext, $mime_types)) {
		return $mime_types[$ext];
	}
	elseif (function_exists('finfo_open')) {
		$finfo = finfo_open(FILEINFO_MIME);
		$mimetype = finfo_file($finfo, $filename);
		finfo_close($finfo);
		return $mimetype;
	}
	else {
		return 'application/octet-stream';
	}
}



// Route::filter('auth.api', function(){
// 	$method = Route::input('method');
// 	$authToken = Route::input('authToken');
// 	$user = authenticateUserOAuth($method, $authToken);

//     if(!user) 
//         return false;

//     return true;
// });

Route::get('/static/js/{jsfile}', function($jsfile){
	return File::get(app_path('webapp/build/static/js/' . $jsfile));
}
);

Route::get('/static/css/{cssfile}', function($cssfile){
	$path = app_path('webapp/build/static/css/' . $cssfile);
	return response()->file($path, ['Content-Type' => 'text/css']);
}
);

Route::get('/static/media/{file}', function($file){
	$path = app_path('webapp/build/static/media/' . $file);
	return response()->file($path, ['Content-Type' => mime_content_type_hack($file)]);
}
);

Route::get('/', function(){
	return File::get(app_path('webapp/build/index.html'));
}
);


Route::get('/api/authenticate', function () {
	return response(Auth::user());
}
)->middleware('auth.oauth')->middleware('nocsrf');

Route::get('/api/offer/list', function(){
	return response(Offer::orderBy('updated_at', 'desc')->get());
})->middleware('nocsrf');

Route::get('/api/offer/new', function(){
	$newOffer = request()->all()['offer'];

	$offer = new Offer($newOffer);
	$offer->user_id = Auth::user()->id;

	if($offer->save()){
		return response($offer->toArray());
	}
})->middleware('auth.oauth')->middleware('nocsrf');

Route::get('/api/offer/update', function () {
    $user = Auth::user();
	$newOffer = request()->all()['offer'];

	$offer = Offer::find($newOffer['id']);

	if(!$offer){
		return response('Offer not found', 404);
	}

	if($offer->user_id != $user->id){
		return response('Not your offer, gtfo', 403);
	}

	$offer->fill($newOffer);
	$offer->save();

	return response($offer);
})->middleware('auth.oauth')->middleware('nocsrf');

//Auth::routes();

Route::get('/home', 'HomeController@index');
