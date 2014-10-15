<?php

$pic=$_GET['pic'];
$result=parse_url($pic);
$host=$result['host'];
$path=$result['path'];
$query=$result['query'];
$path=$path.'?'.$query;
proxyImage($host,$path);

function proxyImage( $fromHost, $path, $bufsize=4096 ) {
  $conn = fsockopen($fromHost,80);
  fwrite( $conn, "GET {$path} HTTP/1.0\r\n" );
  fwrite( $conn, "Host: {$fromHost}\r\n" );
  fwrite( $conn, "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0\r\n" );
  fwrite( $conn, "Connection: close\r\n" );
  fwrite( $conn, "\r\n" );

  $answer = ''; 
  while( !feof($conn) and !$bodystarted ) {
    $portion = fread( $conn, $bufsize );
    if( strpos($portion,"\r\n\r\n")!==false ) $bodystarted = true;
    $answer .= $portion;
  }
  list( $headers, $bodypart ) = explode( "\r\n\r\n", $answer, 2 );

  foreach( explode("\r\n",$headers) as $h )
    header($h);

  echo $bodypart;
  while( !feof($conn) )
    echo fread( $conn, $bufsize );
  fclose($conn);
}

//proxyImage( 'www.newyorker.com', '/online/blogs/photobooth/NASAEarth-01.jpg' );
?>